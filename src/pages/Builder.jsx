import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Wrench, Sparkles, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Builder() {
  return (
    <Layout>
      <Container>
        <Section className="flex flex-col items-center justify-center min-h-[70vh] text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-slate-900 text-primary-light shadow-premium-glow">
              <Wrench className="h-8 w-8 text-primary" />
            </div>
          </div>

          <Badge variant="primary" className="mb-4">
            Prompt 2 — Upcoming
          </Badge>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl">
            Interactive Resume Workspace
          </h1>

          <p className="text-muted text-base md:text-lg mb-8 max-w-xl">
            This workspace will host the interactive resume builder, real-time live preview editor, and ATS optimization suggestions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full text-left mt-4 mb-8">
            <Card>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary-light mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-text mb-2">Live Sync Preview</h3>
              <p className="text-xs text-muted leading-relaxed">
                Watch your resume adapt dynamically to templates as you type each block of experience.
              </p>
            </Card>

            <Card>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 border border-secondary/20 text-secondary-light mb-4">
                <span className="font-bold text-sm text-secondary">ATS</span>
              </div>
              <h3 className="font-semibold text-text mb-2">Real-time Score</h3>
              <p className="text-xs text-muted leading-relaxed">
                Scan your details against standard recruitment software to ensure compatibility.
              </p>
            </Card>

            <Card>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 border border-success/20 text-success mb-4">
                <Plus className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-text mb-2">Section Builders</h3>
              <p className="text-xs text-muted leading-relaxed">
                Easily structure education, projects, skills, and histories with pre-filled tips.
              </p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/">
              <Button variant="secondary">Go back home</Button>
            </Link>
            <Link to="/templates">
              <Button variant="outline">Browse Templates</Button>
            </Link>
          </div>
        </Section>
      </Container>
    </Layout>
  );
}
