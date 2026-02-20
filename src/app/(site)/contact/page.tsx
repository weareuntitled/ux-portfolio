import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { DashboardCV } from '@/components/DashboardCV';
import { Card, CardContent } from '@/components/ui/card';
import { contact } from '@/content/home';
import { getProjectsForNav } from '@/lib/cms/projects-nav';

export const metadata: Metadata = {
  title: 'Contact | Daniel Peters',
  description: 'Contact Daniel Peters for product design, UX strategy, and enterprise workflows.',
};

export const revalidate = 300;

export default async function ContactPage() {
  const draft = await draftMode();
  const navProjects = await getProjectsForNav({ draftMode: draft.isEnabled });

  return (
    <DashboardCV
      navProjects={navProjects}
      breadcrumbs={[
        { label: 'Daniel Peters', href: '/' },
        { label: 'Contact' },
      ]}
      pageTitle="Contact"
    >
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Contact
        </h1>
        <p className="text-muted-foreground">
          Interested in collaborating on product design, UX strategy, or enterprise workflows?
        </p>
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <p className="font-semibold text-foreground">{contact.name}</p>
            <p className="text-sm text-muted-foreground">{contact.tagline}</p>
            <p className="mt-4">
              <span className="text-sm text-muted-foreground">Email: </span>
              <a
                href={`mailto:${contact.email}`}
                className="text-primary hover:underline"
              >
                {contact.email}
              </a>
            </p>
            <p>
              <span className="text-sm text-muted-foreground">Phone: </span>
              <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                {contact.phone}
              </a>
            </p>
          </CardContent>
        </Card>
      </section>
    </DashboardCV>
  );
}
