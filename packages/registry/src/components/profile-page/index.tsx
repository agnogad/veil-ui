import { CalendarDays, Link2, MapPin, MessageSquare, MoreHorizontal, Star } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Avatar, AvatarFallback } from "../avatar/index";
import { Badge } from "../badge/index";
import { Button } from "../button/index";
import { Card, CardContent, CardHeader, CardTitle } from "../card/index";
import { ImageCard } from "../image-card/index";
import { Logo } from "../logo/index";
import { ProfileCard } from "../profile-card/index";
import { Progress } from "../progress/index";
import { SegmentedNavigation } from "../segmented-navigation/index";

const posts = [
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60",
    alt: "Circuit board",
    title: "Notes from rebuilding our token pipeline",
    description: "A short write-up on moving from CSS variables to structured tokens.",
    likes: 128,
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
    alt: "Mountain landscape",
    title: "Designing the dashboard empty states",
    description: "Sketches and decisions behind the new calm empty states.",
    likes: 96,
  },
  {
    src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=800&q=60",
    alt: "Flower field",
    title: "A week of dogfooding our component registry",
    description: "What broke, what held up, and the gaps we found along the way.",
    likes: 214,
  },
];

function ProfilePage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="profile-page"
      className={cn("w-full overflow-hidden rounded-xl border bg-background", className)}
      {...props}
    >
      <header className="flex items-center justify-between border-b px-6 py-3">
        <Logo
          name="Veil UI"
          size="sm"
          mark={
            <span className="grid size-full place-items-center bg-primary text-[10px] font-bold text-primary-foreground">
              V
            </span>
          }
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Share profile
          </Button>
          <Button size="sm">Follow</Button>
        </div>
      </header>

      <div className="h-40 bg-gradient-to-r from-indigo-500/70 via-violet-500/60 to-sky-400/60" />

      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="-mt-10 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <Avatar className="size-20 border-4 border-background text-xl">
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <div className="pb-1">
              <h1 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
                Mira Chen
                <Badge variant="secondary">
                  <Star /> Pro
                </Badge>
              </h1>
              <p className="text-sm text-muted-foreground">@mirachen</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pb-1">
            <Button variant="outline" size="sm">
              <MessageSquare /> Message
            </Button>
            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreHorizontal />
            </Button>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-sm">
          Product lead at Acme. Designing calm interfaces, maintaining the Veil
          UI registry, and writing about design systems.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" aria-hidden /> Lisbon, Portugal
          </span>
          <a href="#link" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <Link2 className="size-4" aria-hidden /> mirachen.dev
          </a>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden /> Joined March 2021
          </span>
        </div>
        <div className="mt-3 flex gap-5 text-sm">
          <span>
            <strong className="font-semibold text-foreground">1,284</strong>{" "}
            <span className="text-muted-foreground">followers</span>
          </span>
          <span>
            <strong className="font-semibold text-foreground">312</strong>{" "}
            <span className="text-muted-foreground">following</span>
          </span>
          <span>
            <strong className="font-semibold text-foreground">48</strong>{" "}
            <span className="text-muted-foreground">posts</span>
          </span>
        </div>

        <div className="mt-6">
          <SegmentedNavigation
            label="Profile sections"
            value="posts"
            options={[
              { value: "posts", label: "Posts" },
              { value: "media", label: "Media" },
              { value: "likes", label: "Likes" },
            ]}
          />
        </div>

        <div className="mt-6 grid gap-6 pb-10 lg:grid-cols-[1fr_300px]">
          <div className="grid gap-5 sm:grid-cols-2">
            {posts.slice(0, 2).map((post) => (
              <ImageCard
                key={post.title}
                src={post.src}
                alt={post.alt}
                title={post.title}
                description={post.description}
                footer={
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="size-3.5" aria-hidden /> {post.likes} likes
                  </span>
                }
              />
            ))}
            <div className="sm:col-span-2">
              <ImageCard
                src={posts[2]?.src ?? ""}
                alt={posts[2]?.alt ?? ""}
                title={posts[2]?.title}
                description={posts[2]?.description}
                imageClassName="aspect-[3/1]"
                footer={
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="size-3.5" aria-hidden /> {posts[2]?.likes} likes
                  </span>
                }
              />
            </div>
          </div>

          <aside className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Profile completion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Progress value={80} aria-label="Profile completion" />
                <p className="text-xs text-muted-foreground">
                  80% complete · Add a profile photo to finish.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">People you may know</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Owen Park", role: "Staff engineer" },
                  { name: "Lena Ortiz", role: "Design director" },
                ].map((person) => (
                  <div key={person.name} className="flex items-center gap-2">
                    <Avatar size="sm">
                      <AvatarFallback>
                        {person.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{person.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {person.role}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            <ProfileCard
              className="max-w-none"
              name="Acme Design"
              role="Official account"
              bio="Design systems, tokens and product craft."
              followers={8420}
              following={12}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

export { ProfilePage };
