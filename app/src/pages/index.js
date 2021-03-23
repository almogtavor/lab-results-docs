/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'מקצה לקצה',
    imageUrl: 'img/PCRR-768x512.png',
    description: (
      <>
        מסלול מעבדות אוסף את נתוני בדיקות הקורונה
         הישר מן המעבדות, ועד להנגשתן ללקוחות השונים - 
        בינהם XRM,
         מגן אבות, דאשבורדים של המשרד ועוד.
      </>
    ),
  },
  {
    title: 'איכות המידע',
    imageUrl: 'img/dqa.png',
    description: (
      <>
          המסלול שם דגש על איכות המידע בעזרת שימוש
          בטבלאות גלם וטבלאות מטויבות.
          המסלול כולל הפלות של מידע לא תקין, טיובים
          במידת הצורך, וניטור מלא על כל שלב בתהליך.
      </>
    ),
  },
  {
    title: 'גיוון החומר',
    imageUrl: 'img/sample-collection-for-rt-pcr.png',
    description: (
      <>
        המסלול תומך בשלל סוגי חומר.
         ביניהם נתוני בדיקות קורונה (מטושים), סרולוגיה,
         בדיקות קורונה מהירות, איגומי מטושים ועוד.
          המסלול מפעיל בהתאם לוגיקות כגון חישובים עצמאיים
           של תוצאות בעקבות מידע קודם,
            אימותי פרוטוקול, הצלבות ועוד.  
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              התחל
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map(({title, imageUrl, description}) => (
                  <Feature
                    key={title}
                    title={title}
                    imageUrl={imageUrl}
                    description={description}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
