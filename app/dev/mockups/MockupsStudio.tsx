"use client";

import { useState } from "react";
import MockupStage from "@/components/mockups/MockupStage";
import { AfriResQAssigned, AfriResQDispatch, AfriResQReport } from "@/components/mockups/afriresq";
import { CommerceCheckout, CommerceSeller, CommerceStorefront } from "@/components/mockups/commerce";
import { CorporateBeforeAfter, CorporateDesignSystem, CorporateResponsive } from "@/components/mockups/corporate";
import { CucoCareAnalytics, CucoCareDashboard, CucoCareSchedule } from "@/components/mockups/cucocare";
import { CyberSaccoHome, CyberSaccoLoan, CyberSaccoOffice } from "@/components/mockups/cybersacco";
import { DevOpsDeploys, DevOpsLogs, DevOpsPipeline } from "@/components/mockups/devops";
import { NileBusOperator, NileBusSeats, NileBusTicket } from "@/components/mockups/enilebus";
import { HospitalOverview, HospitalPharmacy, HospitalRecord } from "@/components/mockups/hospital";
import { NileClinicConsult, NileClinicDesk, NileClinicPhone } from "@/components/mockups/nileclinicplus";
import { NileGoBooking, NileGoDispatch, NileGoTrip } from "@/components/mockups/nilego";
import { SecurityFindings, SecurityGraph, SecurityOverview } from "@/components/mockups/security";
import {
  ServiceAI,
  ServiceCloud,
  ServiceConsulting,
  ServiceData,
  ServiceDesign,
  ServiceMobile,
  ServiceSecurity,
  ServiceSoftware,
} from "@/components/mockups/services";
import { SlimSchoolDashboard, SlimSchoolGradebook, SlimSchoolParent } from "@/components/mockups/slimschool";
import { VoxaConversation, VoxaLanguages, VoxaPhone } from "@/components/mockups/voxa";

const STAGES = [
  { slug: "nilego", n: 1, node: <NileGoBooking /> },
  { slug: "nilego", n: 2, node: <NileGoTrip /> },
  { slug: "nilego", n: 3, node: <NileGoDispatch /> },
  { slug: "schoolmanage", n: 1, node: <SlimSchoolDashboard /> },
  { slug: "schoolmanage", n: 2, node: <SlimSchoolGradebook /> },
  { slug: "schoolmanage", n: 3, node: <SlimSchoolParent /> },
  { slug: "hospital-management-system", n: 1, node: <HospitalOverview /> },
  { slug: "hospital-management-system", n: 2, node: <HospitalRecord /> },
  { slug: "hospital-management-system", n: 3, node: <HospitalPharmacy /> },
  { slug: "cucocare", n: 1, node: <CucoCareDashboard /> },
  { slug: "cucocare", n: 2, node: <CucoCareSchedule /> },
  { slug: "cucocare", n: 3, node: <CucoCareAnalytics /> },
  { slug: "nileclinicplus", n: 1, node: <NileClinicDesk /> },
  { slug: "nileclinicplus", n: 2, node: <NileClinicConsult /> },
  { slug: "nileclinicplus", n: 3, node: <NileClinicPhone /> },
  { slug: "afriresq", n: 1, node: <AfriResQReport /> },
  { slug: "afriresq", n: 2, node: <AfriResQAssigned /> },
  { slug: "afriresq", n: 3, node: <AfriResQDispatch /> },
  { slug: "cyberbook", n: 1, node: <SecurityOverview /> },
  { slug: "cyberbook", n: 2, node: <SecurityFindings /> },
  { slug: "cyberbook", n: 3, node: <SecurityGraph /> },
  { slug: "voxa-ai", n: 1, node: <VoxaConversation /> },
  { slug: "voxa-ai", n: 2, node: <VoxaPhone /> },
  { slug: "voxa-ai", n: 3, node: <VoxaLanguages /> },
  { slug: "e-nilebus", n: 1, node: <NileBusSeats /> },
  { slug: "e-nilebus", n: 2, node: <NileBusTicket /> },
  { slug: "e-nilebus", n: 3, node: <NileBusOperator /> },
  { slug: "cybersacco", n: 1, node: <CyberSaccoHome /> },
  { slug: "cybersacco", n: 2, node: <CyberSaccoLoan /> },
  { slug: "cybersacco", n: 3, node: <CyberSaccoOffice /> },
  { slug: "e-commerce-platform", n: 1, node: <CommerceStorefront /> },
  { slug: "e-commerce-platform", n: 2, node: <CommerceCheckout /> },
  { slug: "e-commerce-platform", n: 3, node: <CommerceSeller /> },
  { slug: "devops-pipeline-tool", n: 1, node: <DevOpsPipeline /> },
  { slug: "devops-pipeline-tool", n: 2, node: <DevOpsDeploys /> },
  { slug: "devops-pipeline-tool", n: 3, node: <DevOpsLogs /> },
  { slug: "corporate-website-redesign", n: 1, node: <CorporateBeforeAfter /> },
  { slug: "corporate-website-redesign", n: 2, node: <CorporateDesignSystem /> },
  { slug: "corporate-website-redesign", n: 3, node: <CorporateResponsive /> },
  { slug: "service-software-development", n: 1, node: <ServiceSoftware /> },
  { slug: "service-mobile-development", n: 1, node: <ServiceMobile /> },
  { slug: "service-ai", n: 1, node: <ServiceAI /> },
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
