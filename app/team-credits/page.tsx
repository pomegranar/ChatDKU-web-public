"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/back-button";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { members, alumni } from "./data";

function ExpandToggle({
  expanded,
  onClick,
}: {
  expanded: boolean;
  onClick: () => void;
}) {
  const { t } = useLanguage();
  return (
    <Button variant="link" className="px-0 text-sm" onClick={onClick}>
      {expanded ? t("team.showLess") : t("team.showMore")}
    </Button>
  );
}

type MemberProps = {
  name: string;
  classYear: string;
  team?: string;
  role: string;
  avatar?: string;
  showContribution?: boolean;
  link?: string;
};

function MajorMember({
  name,
  classYear,
  team,
  role,
  link,
  avatar = "/avatars/default.jpg",
  showContribution = true,
}: MemberProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`flex items-start gap-4 p-4 border rounded-xl w-full max-w-5xl mx-auto`}
    >
      {/* Avatar */}
      <Link href={link || ""}>
        <Image
          src={avatar}
          alt={name}
          width={64}
          height={64}
          className="rounded-full object-cover"
        />
      </Link>

      {/* Info */}
      <div className="flex-1">
        <Link href={link || ""}>
          <p className="font-semibold">
            {name} · {classYear}
          </p>
        </Link>
        <p className="text-sm text-muted-foreground">{team}</p>

        {/* Contribution */}
        {showContribution && (
          <div className="mt-2 text-sm">
            <p
              className={
                expanded
                  ? "whitespace-pre-line"
                  : "line-clamp-2 whitespace-pre-line"
              }
            >
              {role}
            </p>

            <ExpandToggle
              expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function GridMember({
  name,
  classYear,
  avatar = "/avatars/default.png",
  team,
}: {
  name: string;
  classYear: string;
  avatar?: string;
  team?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={avatar}
        alt={name}
        width={72}
        height={72}
        className="rounded-full object-cover"
      />
      <p className="text-sm font-medium text-center">{name}</p>
      <p className="text-xs text-muted-foreground">{classYear}</p>
      {team && (
        <p className="text-xs text-muted-foreground text-center">{team}</p>
      )}
    </div>
  );
}

export default function TeamCreditsPage() {
  const { t } = useLanguage();
  return (
    <div className="flex justify-center py-10">
      <div className="w-10/12 max-w-4xl space-y-10">
        {/* Back Button */}
        <div className="flex justify-end">
          <BackButton />
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <Image
            src="/logos/new_logo.svg"
            alt="ChatDKU Logo"
            width={60}
            height={60}
            className="object-contain"
          />
          <h1 className="text-3xl font-bold">{t("team.credits")}</h1>
        </div>

        {/* Members */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">{t("team.coreMembers")}</h2>

          {members.map((member) => (
            <MajorMember key={member.name} {...member} role={member.role ?? ""} />
          ))}
        </section>

        {/* Alumni */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">{t("team.alumni")}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {alumni.map((member) => (
              <GridMember key={member.name} {...member} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
