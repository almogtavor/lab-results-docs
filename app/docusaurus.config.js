/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'דוקומנטציית מסלול מעבדות',
  tagline: 'תיעוד לפרויקט מסלול מעבדות של מפעל המידע - פותח ותועד על ידי צוות 50% ',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'MOH', // Usually your GitHub org/user name.
  projectName: 'lab-results-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'מסלול מעבדות - מפעל המידע',
      logo: {
        alt: 'Lab Results Logo',
        src: 'img/labresults.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'מסמכים',
          position: 'left',
        },
        {
          to: 'objects/', 
          label: 'אוביקטים של המסלול', 
          position: 'left'
        },
        {
          to: 'blog', 
          label: 'בלוג', 
          position: 'left'
        },
        // Please keep GitHub link to the right for consistency.
        {
          href: 'https://github.com/almogtavor/labresults-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'הטבלאות העיקריות ',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
        {
          title: 'Legal',
          // Please do not remove the privacy and terms, it's a legal requirement.
          items: [
            {
              label: 'Privacy',
              href: 'https://opensource.facebook.com/legal/privacy/',
            },
            {
              label: 'Terms',
              href: 'https://opensource.facebook.com/legal/terms/',
            },
            {
              label: 'Data Policy',
              href: 'https://opensource.facebook.com/legal/data-policy/',
            },
            {
              label: 'Cookie Policy',
              href: 'https://opensource.facebook.com/legal/cookie-policy/',
            },
          ],
        },
      ],
      logo: {
        alt: 'Lab Results Logo',
        src: 'img/labresults.png',
        href: '/',
      },
      // Please do not remove the credits, help to publicize Docusaurus :)
      copyright: `נכתב על ידי צוות 50% במפעל המידע`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
