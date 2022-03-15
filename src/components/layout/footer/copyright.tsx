import Container from '@components/ui/container';
import { siteSettings } from '@settings/site-settings';
import { useTranslation } from 'next-i18next';

const year = new Date().getFullYear();

const Copyright: React.FC = () => {
  const { t } = useTranslation('footer');
  return (
    <div className="pb-20 lg:pb-7">
      <Container>
        <div className="flex flex-col md:flex-row text-center md:justify-between border-t border-skin-three pt-6 lg:pt-7">
          <p className="text-skin-base text-sm leading-7 lg:leading-[27px] lg:text-15px">
            &copy;&nbsp;{t('text-copyright')} {year}&nbsp;
            <a
              className="text-skin-base transition-colors duration-200 ease-in-out hover:text-skin-primary"
              href={siteSettings.author.websiteUrl}
            >
              {siteSettings.author.name}
            </a>
            &nbsp; {t('text-all-rights-reserved')}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Copyright;
