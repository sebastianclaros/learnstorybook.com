import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import Helmet from 'react-helmet';
import Header from './Header';
import Footer from './Footer';
import { GlobalStyle } from '../../styles/global';

const query = graphql`
  query TemplateWrapper {
    site {
      siteMetadata {
        title
        description
        githubUrl
        permalink
      }
    }
    guides: allMarkdownRemark(
      filter: { fields: { pageType: { eq: "guide" } } }
      sort: { order: ASC, fields: [frontmatter___order] }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

const getHeaderInvertedState = pathname => {
  const pathParts = pathname.split('/').filter(p => !!p);
  // This will need to get "smarter" if the hierarchy of pages/guides changes.
  return pathParts.length === 1 && pathParts[0] !== 'team';
};

const TemplateWrapper = ({ location: { pathname }, children }) => (
  <StaticQuery
    query={query}
    render={({
      guides,
      site: {
        siteMetadata: { title, permalink, description, githubUrl },
      },
    }) => (
      <>
        <GlobalStyle />

        <Helmet>
          <link
            rel="shortcut icon"
            type="image/png"
            href="/icon-storybook.png"
            sizes="16x16 32x32 64x64"
          />
          <title>{title}</title>
          <meta name="description" content={description} />

          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={`${permalink}/opengraph-cover.jpg`} />
          <meta property="og:url" content={permalink} />

          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={`${permalink}/opengraph-cover.jpg`} />

          <meta
            name="google-site-verification"
            content="YjriYM9U-aWxhu_dv3PWfCFQ3JNkb7ndk7r_mUlCKAY"
          />
        </Helmet>

        <Header
          guides={guides}
          githubUrl={githubUrl}
          isInverted={getHeaderInvertedState(pathname)}
        />

        {children}
        <Footer guides={guides} />
      </>
    )}
  />
);

TemplateWrapper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default TemplateWrapper;
