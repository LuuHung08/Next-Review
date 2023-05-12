import { useTranslation } from 'next-i18next';
import Button from '@components/Button';
import CustomLink from '@components/CustomLink';
import { ROUTE_PATH } from '@constant/index';

function Home() {
  const { t } = useTranslation('common');
  return (
    <Button type='submit' text={<CustomLink href={ROUTE_PATH.MAP}>{t('map_title')}</CustomLink>} />
  );
}

export default Home;
