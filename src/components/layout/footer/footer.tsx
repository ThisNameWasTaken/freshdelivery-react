import Widgets from '@components/layout/footer/widget/widget';
import Copyright from '@components/layout/footer/copyright';
import { footer } from './data';
const { widgets } = footer;

const Footer: React.FC = () => (
  <footer>
    <Widgets widgets={widgets} />
    <Copyright />
  </footer>
);

export default Footer;
