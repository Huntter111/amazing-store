import React from "react";
import AppLayout from "../../../common/components/AppLayout";
import NotFoundImage from '../../../../assets/main_how_to_design_404_page.webp';
import styles from './notFound.module.scss';

const NotFoundPage = () => {
  return (
    <AppLayout>
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img className={styles.image} src={NotFoundImage}  alt={'Not found page image'}/>
    </AppLayout>
  );
};

export default NotFoundPage;
