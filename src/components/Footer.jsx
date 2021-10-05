import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="contacts__footer footer">
      <p className="footer__copyright">
        {t('footer.year')}
        &copy;
        {t('footer.copyright')}
      </p>
      <p className="footer__author">{t('footer.author')}</p>
    </div>
  );
};

export default Footer;
