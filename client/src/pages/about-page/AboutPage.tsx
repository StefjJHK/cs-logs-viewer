import { ReactElement } from 'react';
import { Accordion, Stack } from 'rsuite';
import { Link } from 'react-router-dom';

function Header({ title, subtitle, ...rest }: { title: string; subtitle: string }): ReactElement {
  return (
    <Stack {...rest} spacing={10} alignItems="flex-start">
      <Stack spacing={2} direction="column" alignItems="flex-start">
        <div>{title}</div>
        <div style={{ color: 'var(--rs-text-secondary)', fontSize: 12 }}>{subtitle}</div>
      </Stack>
    </Stack>
  );
}

export function AboutPage(): ReactElement {
  return (
    <Accordion bordered defaultActiveKey={1}>
      <Accordion.Panel header={<Header title="Log filter" subtitle="Flex structure logs filter" />} eventKey={2}>
        <p>
          Filters based on <Link to="https://github.com/deitch/searchjs">SearchJs</Link>. <br />
          For examples see <Link to="https://github.com/StefjJHK/cs-log-viewer">GitHub repository</Link>
        </p>
      </Accordion.Panel>
      <Accordion.Panel header={<Header title="Structure logs format" subtitle="Logs format based on CLEF" />} eventKey={2}>
        <p>
          CS Logs Viewer supports <Link to="https://clef-json.org/">Compact Log Event Format (CLEF)</Link>.
          <br />
          Application stores uploaded logs in your browsers storage. This means you do not have to re-upload files to view them.
        </p>
      </Accordion.Panel>
      <Accordion.Panel
        header={<Header title="About CS Logs Viewer" subtitle="The web application for viewing structured log files" />}
        eventKey={1}>
        <p>
          <strong>MIT license :</strong> The application can be freely used for commercial purposes.
          <br /> Feel free to create your own applications based on it. You can deploy app on local machine and use as a private tool or
          deploy in server, there is no limitations.
          <br />
          <strong>Easy to use:</strong> Just put compatible log files and search logs! Install locally or use online version. For better
          performance app can be integrated in your starter docker compose file.
        </p>
      </Accordion.Panel>
    </Accordion>
  );
}
