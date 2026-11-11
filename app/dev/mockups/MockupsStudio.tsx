"use client";

import { useState } from "react";
import MockupStage from "@/components/mockups/MockupStage";
import { BankingAdmin, BankingPair, BankingSecurity } from "@/components/mockups/banking";
import { CommerceCheckout, CommerceSeller, CommerceStorefront } from "@/components/mockups/commerce";
import { CorporateBeforeAfter, CorporateDesignSystem, CorporateResponsive } from "@/components/mockups/corporate";
import { CucoCareAnalytics, CucoCareDashboard, CucoCareSchedule } from "@/components/mockups/cucocare";
import { DevOpsDeploys, DevOpsLogs, DevOpsPipeline } from "@/components/mockups/devops";
import { HospitalOverview, HospitalPharmacy, HospitalRecord } from "@/components/mockups/hospital";
import { NileGoBooking, NileGoDispatch, NileGoTrip } from "@/components/mockups/nilego";
import { SecurityFindings, SecurityGraph, SecurityOverview } from "@/components/mockups/security";
import {
  ServiceCloud,
  ServiceConsulting,
  ServiceData,
  ServiceDesign,
  ServiceMobile,
  ServiceSecurity,
  ServiceSoftware,
} from "@/components/mockups/services";
import { SlimSchoolDashboard, SlimSchoolGradebook, SlimSchoolParent } from "@/components/mockups/slimschool";

const STAGES = [
  { slug: "nilego", n: 1, node: <NileGoBooking /> },
  { slug: "nilego", n: 2, node: <NileGoTrip /> },
  { slug: "nilego", n: 3, node: <NileGoDispatch /> },
  { slug: "slimschool", n: 1, node: <SlimSchoolDashboard /> },
  { slug: "slimschool", n: 2, node: <SlimSchoolGradebook /> },
  { slug: "slimschool", n: 3, node: <SlimSchoolParent /> },
  { slug: "hospital-management-system", n: 1, node: <HospitalOverview /> },
  { slug: "hospital-management-system", n: 2, node: <HospitalRecord /> },
  { slug: "hospital-management-system", n: 3, node: <HospitalPharmacy /> },
  { slug: "cucocare", n: 1, node: <CucoCareDashboard /> },
  { slug: "cucocare", n: 2, node: <CucoCareSchedule /> },
  { slug: "cucocare", n: 3, node: <CucoCareAnalytics /> },
  { slug: "security-audit-dashboard", n: 1, node: <SecurityOverview /> },
  { slug: "security-audit-dashboard", n: 2, node: <SecurityFindings /> },
  { slug: "security-audit-dashboard", n: 3, node: <SecurityGraph /> },
  { slug: "e-commerce-platform", n: 1, node: <CommerceStorefront /> },
  { slug: "e-commerce-platform", n: 2, node: <CommerceCheckout /> },
  { slug: "e-commerce-platform", n: 3, node: <CommerceSeller /> },
  { slug: "banking-mobile-app", n: 1, node: <BankingPair /> },
  { slug: "banking-mobile-app", n: 2, node: <BankingSecurity /> },
  { slug: "banking-mobile-app", n: 3, node: <BankingAdmin /> },
  { slug: "devops-pipeline-tool", n: 1, node: <DevOpsPipeline /> },
  { slug: "devops-pipeline-tool", n: 2, node: <DevOpsDeploys /> },
  { slug: "devops-pipeline-tool", n: 3, node: <DevOpsLogs /> },
  { slug: "corporate-website-redesign", n: 1, node: <CorporateBeforeAfter /> },
  { slug: "corporate-website-redesign", n: 2, node: <CorporateDesignSystem /> },
  { slug: "corporate-website-redesign", n: 3, node: <CorporateResponsive /> },
  { slug: "service-software-development", n: 1, node: <ServiceSoftware /> },
  { slug: "service-mobile-development", n: 1, node: <ServiceMobile /> },
  { slug: "service-cybersecurity", n: 1, node: <ServiceSecurity /> },
  { slug: "service-data-analysis", n: 1, node: <ServiceData /> },
  { slug: "service-cloud-devops", n: 1, node: <ServiceCloud /> },
  { slug: "service-ui-ux-design", n: 1, node: <ServiceDesign /> },
  { slug: "service-tech-consulting", n: 1, node: <ServiceConsulting /> },
] as const;

export default function MockupsStudio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  return (
    <div className="min-h-screen bg-[#050505] py-16" data-mockup-theme={theme}>
      <div className="sticky top-4 z-30 mx-auto mb-8 flex w-[1600px] items-center justify-between px-2">
        <p className="text-sm text-white/60">Mockup studio · {STAGES.length} frames</p>
        <button
          type="button"
          onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white"
        >
          {theme === "dark" ? "Light devices" : "Dark devices"}
        </button>
      </div>
      <div className="mx-auto flex w-[1600px] flex-col gap-12">
        {STAGES.map((stage) => (
          <MockupStage key={`${stage.slug}-${stage.n}`} id={`mockup-${stage.slug}-${stage.n}`}>
            {stage.node}
          </MockupStage>
        ))}
      </div>
    </div>
  );
}
