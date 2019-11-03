import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import heroImage from "../images/hero.jpg";

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    projects: allSanityProject(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const IndexPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <section className="hero">
          <h1>Hey!</h1>
          <p>
            I'm Drew! I've been writing code for the past 15 years. While the content and quality
            have changed, my passion has never died down. My newest ventures have led me into web
            development, with a focus on using some of the latest technologies to make sites fast,
            responsive, and pleasing to use.
          </p>
          <p>
            If you're curious what type of work I've done, check out the projects below. These are
            just some samples to show variety in the different types of apps and sites I have made.
            If you have a project in mind, feel free to reach out and we can talk about options for
            your development needs!
          </p>
          <img src={heroImage} alt="hero image" />
        </section>
        <section className="projects">
          {projectNodes && (
            <ProjectPreviewGrid title="My Work" nodes={projectNodes} browseMoreHref="/archive/" />
          )}
        </section>
      </Container>
    </Layout>
  );
};

export default IndexPage;
