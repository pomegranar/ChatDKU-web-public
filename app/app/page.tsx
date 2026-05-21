"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export default function ConstructionPage() {
  const {t} = useLanguage();
  return (
    <div className="text-center flex flex-col justify-center py-10 space-y-4">
      <h3 className="text-2xl">
        ChatDKU is under construction for the time being. Sorry for the inconvenience!
      </h3>
      <Link href="/"><Button>Home</Button></Link>
    </div>
  )
}
