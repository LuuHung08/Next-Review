import { useTranslation } from 'next-i18next';
import Button from '@components/Button';
import CustomLink from '@components/CustomLink';
import { ROUTE_PATH } from '@constant/index';
import { useEffect } from 'react';
import styles from './index.module.scss';
import { useGetListPost } from './services';

function Home() {
  const { t } = useTranslation('common');

  const getListPost = useGetListPost();

  useEffect(() => {
    getListPost.run({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.buttonHome}>
      <Button
        type='submit'
        text={<CustomLink href={ROUTE_PATH.MAP}>{t('map_title')}</CustomLink>}
      />
    </div>
  );
}

export default Home;
