"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-provider";

export default function ConstructionPage() {
  const {t} = useLanguage();
  return (
    <div clasName="text-center flex flex-col justify-center py-10 space-y-4">
    <h3 clasName="text-2xl">
    ChatDKU is under construciton for the time being. Sorry for the inconvenience!
      </h3>
    <Link href="/"><Button>Home</Button></Link>
    </div>
  )
}
