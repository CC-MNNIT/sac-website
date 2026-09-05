import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70svh] flex-col items-center justify-center py-32 text-center">
      <span className="font-display text-[6rem] leading-none text-line-strong sm:text-[9rem]">
        404
      </span>
      <h1 className="mt-4 text-3xl sm:text-4xl">This page isn&apos;t in the Centre.</h1>
      <p className="mt-4 max-w-md text-ink-muted">
        The link may be out of date. Try the club directory — everything the SAC runs is listed
        there.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/clubs">
          Browse clubs
          <ArrowRight className="size-4" />
        </ButtonLink>
        <ButtonLink href="/" variant="outline">
          Back home
        </ButtonLink>
      </div>
    </div>
  );
}
