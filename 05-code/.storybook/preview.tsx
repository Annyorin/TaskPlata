import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { matchers: { color: /(background|color)$/i } },
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#f5f6f9' },
        { name: 'surface', value: '#ffffff' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="marks-scope" style={{ fontFamily: 'var(--font-sans)', minWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
}

export default preview
