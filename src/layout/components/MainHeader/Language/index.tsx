import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styles from './language.module.scss';
import { useOutsideAlerter } from '@hooks/useOutsiteAlert';

const IconArrowDown = () => {
  return <Image src='/static/icons/icon-arrow-down.svg' alt='' width={10} height={17} />;
};

const LANG_COMMON: any = {
  en: 'US',
  vi: 'VI',
};

const LIST_LANG = [
  {
    icon: '/static/icons/icon-flag-us.svg',
    label: 'lang_us',
    value: 'en',
  },
  {
    icon: '/static/icons/icon-flag-vn.svg',
    label: 'lang_vi',
    value: 'vi',
  },
];

const OverlayLang = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const onChangeLang = (lang: string) => () => {
    router.push(router.pathname, router.pathname, {
      locale: lang,
    });
  };

  return (
    <div className={styles.selectLangDropdown}>
      {LIST_LANG.map((item, idx) => {
        return (
          <div key={idx} onClick={onChangeLang(item.value)} className={styles.langItem}>
            <Image src={item.icon} alt={t(item.label)} width={21} height={16} />
            <span>{t(item.label)}</span>
          </div>
        );
      })}
    </div>
  );
};

const Language = () => {
  const { t } = useTranslation('common');

  const refShow = useRef(null);

  const router = useRouter();

  const [show, setShow] = useState<boolean>(false);
  const langActive = LIST_LANG.find((lang) => lang.value === router.locale);

  useOutsideAlerter(refShow, () => {
    show && setShow(false);
  });

  return (
    <div className={styles.containerLang}>
      <div className={styles.btnSelectLang} onClick={() => setShow(true)}>
        <Image
          src={langActive?.icon || '/'}
          alt={t(langActive?.label || '')}
          width={28}
          height={20}
        />
        <span>{LANG_COMMON[`${router?.locale || 'en'}`]}</span>
        <IconArrowDown />
      </div>
      {show && (
        <div ref={refShow} className={styles.showLang}>
          <OverlayLang />
        </div>
      )}
    </div>
  );
};

export default Language;
