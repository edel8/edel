"use client";

import { StaggerContainer, StaggerItem, FadeTransition } from "@/components/layout/PageTransition";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Brain, Heart, Gamepad2, MessageSquare, AlertTriangle, BookOpen, TrendingUp, Clock, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Current Mood", value: "7/10", icon: Heart, color: "text-rose-500", trend: "+12%", trendColor: "text-emerald-500" },
  { label: "Energy Level", value: "6/10", icon: TrendingUp, color: "text-amber-500", trend: "+5%", trendColor: "text-emerald-500" },
  { label: "Stress Level", value: "4/10", icon: Brain, color: "text-blue-500", trend: "-8%", trendColor: "text-emerald-500" },
  { label: "Sleep Quality", value: "7.5h", icon: Moon, color: "text-indigo-500", trend: "+0.5h", trendColor: "text-emerald-500" },
];

const quickActions = [
  { name: "Log Mood", href: "/wellness-tracker", icon: Heart, description: "Track your daily mood", color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" },
  { name: "CBT Exercise", href: "/cbt-playbook", icon: Brain, description: "Practice cognitive restructuring", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
  { name: "Play Game", href: "/mind-games", icon: Gamepad2, description: "Cognitive training games", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
  { name: "Connect", href: "/vent-connect", icon: MessageSquare, description: "Share & support others", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { name: "Emergency", href: "/emergency", icon: AlertTriangle, description: "Crisis resources", color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
  { name: "Learn", href: "/disorders", icon: BookOpen, description: "Mental health library", color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
];

const recentActivity = [
  { type: "mood", title: "Mood Logged", description: "Feeling peaceful and grateful", time: "2 hours ago", icon: Heart, color: "text-rose-500" },
  { type: "exercise", title: "CBT Completed", description: "Thought Record - Anxiety", time: "5 hours ago", icon: Brain, color: "text-blue-500" },
  { type: "game", title: "Game Played", description: "Memory Match - Score: 2,450", time: "Yesterday", icon: Gamepad2, color: "text-purple-500" },
  { type: "session", title: "Therapy Session", description: "Dr. Sarah Mitchell - Completed", time: "2 days ago", icon: Clock, color: "text-emerald-500" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Welcome back, Alex</h1>
          <p className="text-muted-foreground mt-1">Here's your mental wellness overview for today</p>
        </div>
        <Button variant="primary" size="md">
          <Sun className="mr-2 h-4 w-4" />
          Log Mood
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StaggerItem key={stat.label} delay={index * 0.1}>
            <Card className="glass-card-hover" padding="md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className={cn("text-sm font-medium mt-1", stat.trendColor)}>{stat.trend} vs last week</p>
                </div>
                <div className={cn("p-3 rounded-xl", stat.color)}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StaggerContainer>
            <StaggerItem>
              <Card className="glass-card-hover" padding="md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Choose an activity to support your wellness journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {quickActions.map((action, index) => (
                      <StaggerItem key={action.name} delay={index * 0.05}>
                        <a
                          href={action.href}
                          className={cn(
                            "glass-card-strong p-4 rounded-xl transition-all duration-200",
                            "hover:glass-strong-hover hover:-translate-y-1",
                            "group flex flex-col items-center text-center gap-3"
                          )}
                        >
                          <div className={cn("p-3 rounded-xl", action.color)}>
                            <action.icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{action.name}</p>
                            <p className="text-xs text-muted-foreground">{action.description}</p>
                          </div>
                        </a>
                      </StaggerItem>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem delay={0.2}>
              <Card className="glass-card-hover" padding="md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest wellness activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <StaggerItem key={activity.title} delay={index * 0.05}>
                        <div className="flex items-center gap-4 p-3 glass-subtle rounded-xl">
                          <div className={cn("p-2 rounded-lg", activity.color + "/10")}>
                            <activity.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                        </div>
                      </StaggerItem>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" asChild>
                    <a href="/wellness-tracker">View all activity →</a>
                  </Button>
                </CardFooter>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>

        <div className="space-y-6">
          <StaggerContainer>
            <StaggerItem>
              <Card className="glass-card-hover" padding="md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Weekly Insights
                  </CardTitle>
                  <CardDescription>Your progress this week</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { label: "Mood Average", value: "7.2", target: "7.5", color: "bg-rose-500" },
                      { label: "Energy Average", value: "6.5", target: "7.0", color: "bg-amber-500" },
                      { label: "Stress Average", value: "3.8", target: "3.0", color: "bg-blue-500" },
                      { label: "Sleep Average", value: "7.3h", target: "8.0h", color: "bg-indigo-500" },
                    ].map((insight) => (
                      <div key={insight.label} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{insight.label}</span>
                          <span className="font-medium text-foreground">{insight.value} / {insight.target}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full transition-all duration-500", insight.color)}
                            style={{ width: "85%" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem delay={0.1}>
              <Card className="glass-card-hover" padding="md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-rose-500" />
                    Today's Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="glass-subtle p-4 rounded-xl">
                    <p className="text-sm text-foreground mb-3">
                      Based on your current mood, we recommend a brief <strong>breathing exercise</strong> to help center yourself.
                    </p>
                    <Button variant="primary" className="w-full" asChild>
                      <a href="/cbt-playbook?exercise=breathing">Start 5-min Breathing →</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem delay={0.2}>
              <Card className="glass-card-hover" padding="md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-emerald-500" />
                    Community Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { user: "Anonymous", preview: "Just finished my first CBT thought record...", time: "1h ago" },
                    { user: "Sam K.", preview: "The breathing exercise really helped my anxiety today", time: "3h ago" },
                    { user: "Alex M.", preview: "Grateful for this community 💚", time: "5h ago" },
                  ].map((post) => (
                    <div key={post.preview} className="glass-subtle p-3 rounded-lg">
                      <p className="text-xs font-medium text-primary">{post.user}</p>
                      <p className="text-sm text-foreground mt-1 line-clamp-2">{post.preview}</p>
                      <p className="text-xs text-muted-foreground mt-1">{post.time}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2" asChild>
                    <a href="/vent-connect">Join the conversation →</a>
                  </Button>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
}