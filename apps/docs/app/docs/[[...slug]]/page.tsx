import { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getMDXComponents } from "@/components/mdx";
import { FrameworkSourceTabs } from "@/components/framework-source-tabs";
import { getComponentFrameworkSources } from "@/lib/framework-source";
import { source } from "@/lib/source";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const slug = params.slug ?? [];
  const componentName =
    slug.length === 2 && slug[0] === "components" ? slug[1] : undefined;
  const frameworkSources = componentName
    ? getComponentFrameworkSources(componentName)
    : null;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
        {frameworkSources && componentName ? (
          <section className="mt-12 border-t pt-8">
            <h2 className="text-xl font-semibold tracking-tight">
              Vue and plain HTML
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This component also ships for Vue (Reka UI) and plain HTML.
              Install it with{" "}
              <code>
                npx veil-ui add {componentName} --framework vue
              </code>{" "}
              or switch the framework in <code>components.json</code>.
            </p>
            <FrameworkSourceTabs
              vue={frameworkSources.vue}
              html={frameworkSources.html}
            />
          </section>
        ) : null}
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
