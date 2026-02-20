'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  whatIDoMostChips,
  skillsRadarProductData,
} from '@/content/home';
import { SkillsRadarProductChart } from '@/components/SkillsRadarProductChart';
import { SkillJourneyChart, CareerPhasesPanel } from '@/components/charts/SkillJourneyChart';
import { FadeIn } from '@/components/motion';

export function ProfileCardSection() {
  const skillsData = [...skillsRadarProductData];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left: Charts panel */}
      <div className="lg:col-span-7">
        <FadeIn>
          <Card className="h-full overflow-hidden border-border bg-card">
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Core profile</p>
                  <h2 className="text-xl font-semibold">Skills and Growth</h2>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Tabs defaultValue="skills" className="w-full">
                <TabsList className="mb-4 w-full sm:w-auto">
                  <TabsTrigger value="skills" className="flex-1 sm:flex-none">
                    Skills
                  </TabsTrigger>
                  <TabsTrigger value="growth" className="flex-1 sm:flex-none">
                    Growth
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="skills"
                  className="mt-0 data-[state=inactive]:hidden data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:animate-in data-[state=active]:fade-in-0"
                >
                  <div className="min-h-[300px] md:min-h-[340px]">
                    <SkillsRadarProductChart
                      data={skillsData}
                      className="mx-auto aspect-square max-h-[340px] w-full md:max-h-[380px]"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {whatIDoMostChips.map((chip) => (
                      <Badge
                        key={chip}
                        variant="secondary"
                        className="text-xs font-medium"
                      >
                        {chip}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent
                  value="growth"
                  className="mt-0 data-[state=inactive]:hidden data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:animate-in data-[state=active]:fade-in-0"
                >
                  <div className="min-h-[300px] md:min-h-[340px]">
                    <SkillJourneyChart embedded rightContent={false} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      {/* Right: Career phases panel */}
      <div className="lg:col-span-5">
        <FadeIn>
          <Card className="h-full overflow-hidden border-border bg-card">
            <CardHeader className="pb-3">
              <p className="text-sm text-muted-foreground">Career phases</p>
              <h2 className="text-xl font-semibold">Education, Experience, Specialization</h2>
            </CardHeader>
            <CardContent className="pt-0">
              <CareerPhasesPanel inCard />
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
