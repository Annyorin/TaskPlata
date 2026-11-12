#!/usr/bin/env python3
"""
Чистилка провенанс-меток из файлов: C2PA, EXIF, XMP, комментарии.
Lossless — пиксели/векторы не трогаются, вырезаются только метадата-сегменты.
Чистый Python 3, без сторонних зависимостей. Работает на macOS/Windows/Linux.

Что это НЕ делает: не трогает статистическую текстовую вотермарку Claude
(её в файле-картинке нет; про текст — см. references/text.md).

Использование:
  python3 clean_provenance.py --check файл.png        # показать, что внутри
  python3 clean_provenance.py файл.png                 # вычистить -> файл_clean.png
  python3 clean_provenance.py --inplace файл.png        # перезаписать на месте
  python3 clean_provenance.py --check ./папка           # обойти папку рекурсивно
  python3 clean_provenance.py --inplace ./deliverables  # вычистить всю папку
"""
import struct, sys, os, re

SUPPORTED = ('.png', '.jpg', '.jpeg', '.svg')

# PNG: оставляем критичные и визуальные chunk'и, режем метадатные (tEXt/iTXt/zTXt/eXIf/caBX)
PNG_KEEP = {b'IHDR', b'PLTE', b'IDAT', b'IEND', b'tRNS', b'gAMA', b'cHRM',
            b'sRGB', b'iCCP', b'bKGD', b'pHYs', b'sBIT', b'hIST', b'sPLT',
            b'acTL', b'fcTL', b'fdAT'}  # последние три — APNG-анимация


def scan_png(data):
    if data[:8] != b'\x89PNG\r\n\x1a\n':
        raise ValueError('не PNG')
    out = bytearray(data[:8]); pos = 8; removed = []
    while pos < len(data):
        ln = struct.unpack('>I', data[pos:pos+4])[0]
        ctype = data[pos+4:pos+8]
        chunk = data[pos:pos+12+ln]
        if ctype in PNG_KEEP:
            out += chunk
        else:
            removed.append(ctype.decode('latin1', 'replace'))
        pos += 12 + ln
        if ctype == b'IEND':
            break
    return bytes(out), removed


def scan_jpeg(data):
    if data[:2] != b'\xff\xd8':
        raise ValueError('не JPEG')
    out = bytearray(b'\xff\xd8'); pos = 2; removed = []
    while pos < len(data):
        if data[pos] != 0xFF:
            out += data[pos:]; break
        marker = data[pos+1]
        if marker == 0xDA:                       # SOS — дальше сжатые данные, копируем всё
            out += data[pos:]; break
        if 0xD0 <= marker <= 0xD9 or marker == 0x01:  # маркеры без длины
            out += data[pos:pos+2]; pos += 2; continue
        seglen = struct.unpack('>H', data[pos+2:pos+4])[0]
        seg = data[pos:pos+2+seglen]
        if marker == 0xE0:                       # APP0 (JFIF) — структурный, оставляем
            out += seg
        elif 0xE1 <= marker <= 0xEF:             # APP1..APP15: EXIF, XMP, JUMBF/C2PA — режем
            removed.append('APP%d' % (marker - 0xE0))
        elif marker == 0xFE:                     # COM — комментарий, режем
            removed.append('COM')
        else:
            out += seg
        pos += 2 + seglen
    return bytes(out), removed


def scan_svg(text):
    removed = []
    if re.search(r'<metadata[\s>]', text, re.I):
        removed.append('<metadata>')
    text = re.sub(r'<metadata[\s\S]*?</metadata>', '', text, flags=re.I)
    if 'c2pa' in text.lower():
        removed.append('c2pa')
    text = re.sub(r'\sxmlns:c2pa="[^"]*"', '', text, flags=re.I)
    if re.search(r'<!--[\s\S]*?-->', text):
        removed.append('comments')
    text = re.sub(r'<!--[\s\S]*?-->', '', text)
    if re.search(r'<\?xpacket|<x:xmpmeta', text, re.I):
        removed.append('xmp')
    text = re.sub(r'<\?xpacket[\s\S]*?\?>', '', text)
    text = re.sub(r'<x:xmpmeta[\s\S]*?</x:xmpmeta>', '', text, flags=re.I)
    return text, removed


def scan(path):
    ext = os.path.splitext(path)[1].lower()
    raw = open(path, 'rb').read()
    if ext == '.png':
        cleaned, removed = scan_png(raw)
    elif ext in ('.jpg', '.jpeg'):
        cleaned, removed = scan_jpeg(raw)
    elif ext == '.svg':
        c, removed = scan_svg(raw.decode('utf-8', 'replace'))
        cleaned = c.encode('utf-8')
    else:
        return None, ['SKIP'], raw, raw
    return cleaned, removed, raw, cleaned


def iter_files(target):
    if os.path.isdir(target):
        for root, _, files in os.walk(target):
            for f in files:
                if os.path.splitext(f)[1].lower() in SUPPORTED:
                    yield os.path.join(root, f)
    else:
        yield target


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    check = '--check' in sys.argv
    inplace = '--inplace' in sys.argv
    if not args:
        print(__doc__); return
    any_found = False
    for target in args:
        for path in iter_files(target):
            ext = os.path.splitext(path)[1].lower()
            if ext not in SUPPORTED:
                continue
            cleaned, removed, raw, _ = scan(path)
            found = [r for r in removed if r != 'SKIP']
            if check:
                if found:
                    any_found = True
                    print(f'⚑ {path}: метки -> {", ".join(found)}')
                else:
                    print(f'· {path}: чисто')
                continue
            if not found:
                print(f'· {path}: нечего чистить')
                continue
            outp = path if inplace else path.replace(ext, '_clean' + ext)
            open(outp, 'wb').write(cleaned)
            saved = len(raw) - len(cleaned)
            print(f'✓ {path} -> {outp}  вырезано: {", ".join(found)}  (-{saved} б)')
    if check and not any_found:
        print('\nВсё чисто: провенанс-меток не найдено.')


if __name__ == '__main__':
    main()
