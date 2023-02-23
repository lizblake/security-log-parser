import { html } from 'lit';
import '../src/security-log-parser.js';

export default {
  title: 'SecurityLogParser',
  component: 'security-log-parser',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <security-log-parser
      style="--security-log-parser-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </security-log-parser>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
