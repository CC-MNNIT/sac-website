import type { MetadataRoute } from "next";
import { activities, clubs, events, site } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* §18 navigation, plus the pages reachable from it. */
  const staticRoutes = [
    "",
    "/about",
    "/activities",
    "/clubs",
    "/sports",
    "/events",
    "/calendar",
    "/news",
    "/join",
    "/archive",
    "/achievements",
    "/facilities",
    "/people",
    "/committee",
    "/gallery",
    "/documents",
    "/reports",
    "/contact",
    "/search",
    "/web-team",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const detail = (paths: string[]) =>
    paths.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [
    ...staticRoutes,
    ...detail(clubs.map((club) => `/clubs/${club.slug}`)),
    ...detail(activities.map((activity) => `/activities/${activity.slug}`)),
    ...detail(events.map((event) => `/events/${event.slug}`)),
  ];
}
