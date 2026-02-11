"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="size-5" />
              Next.js App Router Ready
            </CardTitle>
            <CardDescription>Configured with Tailwind, shadcn/ui, lucide-react, and framer-motion.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Badge variant="secondary">src/app + src/components + src/content</Badge>
            <Separator />
            <Tabs defaultValue="components">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="inputs">Inputs</TabsTrigger>
              </TabsList>
              <TabsContent value="components" className="pt-3 text-sm text-muted-foreground">
                Button, Card, Badge, Dialog, Tabs, Input, Select, and Separator are initialized.
              </TabsContent>
              <TabsContent value="inputs" className="space-y-3 pt-3">
                <Input placeholder="Project name" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="portfolio">Portfolio</SelectItem>
                  </SelectContent>
                </Select>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>shadcn/ui initialized</DialogTitle>
                  <DialogDescription>All requested base components are added under src/components/ui.</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button>Continue</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </main>
  );
}
