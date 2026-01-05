import { Component } from '@angular/core';
// ✅ ADD THESE IMPORTS at the top of your component file
import { AfterViewInit, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { SupabaseService } from './services/supabase.service';

type CaseTypeOption = { value: string; label: string };

type VerdictItem = {
  title: string; // "Plaintiff v. Defendant"
  summary: string;
  amountLabel: string; // "$16.4 Million"
  resultLabel: string; // "Verdict" / "Settlement"
  preTrialOfferLabel?: string; // optional
  preTrialOfferValue?: string; // optional
};

@Component({
  selector: 'app-root',
  template: `
    <!-- HEADER -->
    <header class="w-full bg-[#f8f9fc]">
      <div
        class="max-w-8xl mx-auto px-6 h-[107px] flex items-center justify-between"
      >
        <!-- LEFT: LOGO PLACEHOLDER -->
        <div class="flex items-center">
          <img
            src="https://poyoniswljtlevoswqcg.supabase.co/storage/v1/object/public/logos/lions-den-law-logo-header-2x.png"
            alt="Lions Den Law P.C."
            class="h-[48px] md:h-[250px] w-auto object-contain mt-2 -ml-2"
          />
        </div>

        <!-- RIGHT: PHONE -->
        <a
          href="tel:+15122287031"
          class="phone-link text-[27px] md:text-[27px] font-extrabold tracking-wide text-black mr-4"
        >
          (512) 228-7031
        </a>
      </div>
    </header>

    <!-- HERO / PANEL -->
    <section class="w-full bg-whit -mt-5">
      <div class=" mx-auto py-10">
        <div class="bg-[#e9f1ff] rounded-2xl p-8 md:p-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mt-4">
            <!-- LEFT COPY -->
            <div class="pr-0 lg:pr-10">
              <h1
                class="text-[44px] leading-[1.05] font-extrabold text-[#0b0f16]"
              >
                Millions Recovered<br class="hidden md:block" />
                for Clients
              </h1>

              <h2
                class="mt-8 text-[44px] leading-[1.05] font-light text-[#0b0f16]"
              >
                Get a Lions Den Lawyer
              </h2>

              <p class="mt-6 max-w-xl text-[18px] leading-7 text-[#0b0f16]/80">
                I’m a seasoned personal injury attorney launching Lions Den Law
                PC, with years of high-stakes experience and a proven track
                record of multimillion-dollar settlements and verdicts. If
                you’ve been hurt due to negligence — on the job, in a crash, or
                because of unsafe property conditions — I’m here to fight for
                full and fair compensation.
              </p>

              <!-- Compact: Practice Areas + Links (blended in, no "As seen on") -->
              <div class="mt-6 max-w-xl">
                <div
                  class="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-[#0b0f16]/85"
                >
                  <span class="font-semibold">Practice Areas:</span>
                  <span>Construction Accidents</span>
                  <span>Motor Vehicle Accidents</span>
                  <span>Slip &amp; Fall / Premises</span>
                  <span>General Negligence</span>
                </div>

                <div class="mt-4 flex flex-wrap items-center gap-3 text-[14px]">
                  <a
                    class="phone-link font-semibold text-[#0b0f16]"
                    href="https://ask4sam.net/attorneys/brandon-nunez/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Personal Bio
                  </a>

                  <span class="text-[#0b0f16]/40">•</span>

                  <a
                    class="phone-link font-semibold text-[#0b0f16]"
                    href="https://www.forthepeople.com/free-case-evaluation/get-a-lawyer/var/search/?utm_source=google&utm_medium=cpc&utm_campaign=11256099765&utm_term=%2Bmorgan%20%2Band%20%2Bmorgan&utm_content=664150104454&ads_adsid=664150104454&utm_kxconfid=ty6howcay&gad_source=1&gad_campaignid=11256099765&gbraid=0AAAAADexNgxuB7NqxGlKWr0MfqwCAe221&gclid=Cj0KCQiArt_JBhCTARIsADQZaympyzzfuKt_AN-hXOXmjRZfihG2jHI_N-t8SPL-JUQ4JkKc1ksexNsaAsKLEALw_wcB"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Another Link
                  </a>
                </div>
              </div>
            </div>

            <!-- RIGHT FORM -->
            <div class="w-full">
              <p class="text-[18px] font-semibold text-[#0b0f16]">
                The Fee Is Free® unless we win.
              </p>

              <form
                class="mt-4 space-y-4"
                (ngSubmit)="onSubmit()"
                #leadForm="ngForm"
              >
                <!-- Row 1 -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    class="form-field"
                    type="text"
                    name="firstName"
                    [(ngModel)]="model.firstName"
                    placeholder="First Name"
                  />
                  <input
                    class="form-field"
                    type="text"
                    name="lastName"
                    [(ngModel)]="model.lastName"
                    placeholder="Last Name"
                  />
                </div>

                <!-- Row 2 -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    class="form-field"
                    type="tel"
                    name="phone"
                    [(ngModel)]="model.phone"
                    placeholder="Phone Number"
                  />
                  <input
                    class="form-field"
                    type="text"
                    name="zip"
                    [(ngModel)]="model.zip"
                    placeholder="Zip Code"
                  />
                </div>

                <!-- Email -->
                <input
                  class="form-field"
                  type="email"
                  name="email"
                  [(ngModel)]="model.email"
                  placeholder="E-mail"
                />

                <!-- Case Type (your exact options) -->
                <select
                  class="form-field"
                  aria-label="Form 2 Select Case Type"
                  id="edit-case-type-select--2"
                  name="case_type_select"
                  [(ngModel)]="model.caseType"
                >
                  <option value="" selected>- Case Type -</option>
                  <option *ngFor="let o of caseTypeOptions" [value]="o.value">
                    {{ o.label }}
                  </option>
                </select>

                <!-- Describe -->
                <textarea
                  class="form-field min-h-[160px] resize-none pt-4"
                  name="description"
                  [(ngModel)]="model.description"
                  placeholder="Please describe what happened"
                ></textarea>

                <!-- Consent -->
                <label
                  class="flex items-start gap-2 text-[12px] leading-4 text-[#0b0f16]/80"
                >
                  <input
                    type="checkbox"
                    name="consent"
                    [(ngModel)]="model.consent"
                    class="mt-[2px] accent-[#0b0f16]"
                  />
                  <span>
                    I hereby expressly consent to receive automated
                    communications including calls, texts, emails, and/or
                    prerecorded messages.
                  </span>
                </label>

                <p class="text-[12px] text-[#0b0f16]/70 leading-4">
                  By submitting this form, you agree to our Terms &amp;
                  acknowledge our Privacy Policy.
                </p>

                <!-- CTA (gold/black style) -->
                <div class="flex justify-center pt-1">
                  <button
                    type="submit"
                    class="cta-btn"
                    [disabled]="isSubmitting"
                  >
                    {{ isSubmitting ? 'Submitting...' : 'Start your claim' }}
                  </button>

                  <p
                    *ngIf="submitError"
                    class="text-[12px] text-red-600 leading-4 text-center mt-2"
                  >
                    {{ submitError }}
                  </p>

                  <p
                    *ngIf="submitSuccess"
                    class="text-[12px] text-green-700 leading-4 text-center mt-2"
                  >
                    Thanks — your request has been received. We’ll be in touch
                    shortly.
                  </p>
                </div>

                <p class="text-[11px] text-[#0b0f16]/60 leading-4 text-center">
                  Results may vary depending on your particular facts and legal
                  circumstances.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- LARGE CENTERED IMAGE PANEL (EXTENSION / BLEND) -->
    <section class="w-full bg-[#e9f1ff] -mt-10 px-4">
      <div class="max-w-7xl mx-auto px-6 pb-16">
        <!-- This wrapper makes it feel like a continuation of the hero card -->
        <div class="blend-panel blend-panel--narrow">
          <img
            src="https://oavgdbectmktxcybnswy.supabase.co/storage/v1/object/public/JSA/unnamed.png"
            alt="Attorney photo"
            class="blend-image blend-image--block"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- VERDICTS & SETTLEMENTS (CLICK TO REVEAL DETAILS) -->
    <section class="w-full bg-white py-20">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto">
          <p class="text-[13px] tracking-widest text-slate-500 font-semibold">
            OUR RESULTS SPEAK FOR THEMSELVES
          </p>

          <h2
            class="mt-3 text-[40px] md:text-[46px] font-extrabold text-[#0b0f16]"
          >
            Verdicts &amp; Settlements
          </h2>

          <p class="mt-4 text-[13px] text-slate-500">
            Results may vary depending on your particular facts and legal
            circumstances.
          </p>

          <p class="mt-6 text-[18px] text-[#0b0f16]/85">
            We don’t just want to do well — we want our clients to get what
            they’re entitled to and defendants to face real accountability.
          </p>
        </div>

        <!-- Panels (CENTERED wrapper) -->
        <div class="mt-14">
          <div class="mx-auto w-full max-w-[500px] space-y-5">
            <div *ngFor="let v of verdicts; let i = index">
              <!-- Collapsed: ONLY case name -->
              <button
                type="button"
                (click)="toggleVerdict(i)"
                class="verdict-row"
                [class.verdict-row--active]="i === openVerdictIndex"
                [attr.aria-expanded]="i === openVerdictIndex"
              >
                <div class="verdict-row__inner">
                  <p
                    class="text-[16px] md:text-[18px] font-semibold text-[#0b0f16]"
                  >
                    {{ v.title }}
                  </p>
                </div>
              </button>

              <!-- Expanded: details revealed -->
              <div
                class="verdict-reveal"
                [class.verdict-reveal--open]="i === openVerdictIndex"
              >
                <div
                  class="verdict-reveal__inner verdict-reveal__inner--attached"
                >
                  <p class="text-[14px] leading-6 text-[#0b0f16]/80">
                    {{ v.summary }}
                  </p>

                  <div class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="detail-card">
                      <p class="text-[12px] text-slate-500">
                        {{ v.resultLabel }}
                      </p>
                      <p class="mt-1 text-[24px] font-extrabold text-[#0b0f16]">
                        {{ v.amountLabel }}
                      </p>
                    </div>

                    <div
                      class="detail-card"
                      *ngIf="v.preTrialOfferLabel && v.preTrialOfferValue"
                    >
                      <p class="text-[12px] text-slate-500">
                        {{ v.preTrialOfferLabel }}
                      </p>
                      <p class="mt-1 text-[20px] font-semibold text-[#0b0f16]">
                        {{ v.preTrialOfferValue }}
                      </p>
                    </div>
                  </div>

                  <p class="mt-5 text-[11px] text-slate-500">
                    * Placeholder we need to add real values later
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- /center wrapper -->
        </div>
      </div>
    </section>

    <!-- ✅ ADD THIS SECTION right before your FOOTER -->
    <section class="w-full bg-[#e9f1ff] py-20" #howItWorksSection>
      <div class="max-w-7xl mx-auto px-6">
        <!-- Header -->
        <div class="max-w-3xl">
          <p class="text-[13px] tracking-widest text-slate-500 font-semibold">
            HOW IT WORKS
          </p>

          <h2
            class="mt-4 text-[42px] md:text-[54px] leading-[1.05] font-extrabold text-[#0b0f16]"
          >
            It's easy to get started.<br />
            The Fee Is Free<sup>®</sup>. Only pay if we win.
          </h2>

          <p class="mt-6 text-[13px] text-slate-500">
            Results may vary depending on your particular facts and legal
            circumstances.
          </p>
        </div>

        <!-- Cards -->
        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- STEP 1 -->
          <div class="how-card" [class.how-card--show]="howStepsVisible[0]">
            <p class="text-[12px] tracking-widest text-slate-500 font-semibold">
              STEP 1
            </p>

            <h3
              class="mt-5 text-[34px] leading-[1.05] font-extrabold text-[#0b0f16]"
            >
              Submit<br />your claim
            </h3>

            <p class="mt-6 text-[14px] leading-6 text-[#0b0f16]/75">
              With a free case evaluation, submitting your case is easy.
              (Placeholder)
            </p>
          </div>

          <!-- STEP 2 -->
          <div class="how-card" [class.how-card--show]="howStepsVisible[1]">
            <p class="text-[12px] tracking-widest text-slate-500 font-semibold">
              STEP 2
            </p>

            <h3
              class="mt-5 text-[34px] leading-[1.05] font-extrabold text-[#0b0f16]"
            >
              We take<br />action
            </h3>

            <p class="mt-6 text-[14px] leading-6 text-[#0b0f16]/75">
              Our dedicated team gets to work investigating your claim.
              (Placeholder)
            </p>
          </div>

          <!-- STEP 3 -->
          <div class="how-card" [class.how-card--show]="howStepsVisible[2]">
            <p class="text-[12px] tracking-widest text-slate-500 font-semibold">
              STEP 3
            </p>

            <h3
              class="mt-5 text-[34px] leading-[1.05] font-extrabold text-[#0b0f16]"
            >
              We fight<br />for you
            </h3>

            <p class="mt-6 text-[14px] leading-6 text-[#0b0f16]/75">
              If we take on the case, our team fights to get you the results you
              deserve. (Placeholder)
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="w-full bg-white border-t border-slate-200">
      <div class="max-w-7xl mx-auto px-6 py-14">
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-sm text-[#0b0f16]/80"
        >
          <!-- LEFT: LOGO + QUICK LINKS -->
          <div class="space-y-4">
            <!-- Logo Placeholder -->
            <img
              src="https://poyoniswljtlevoswqcg.supabase.co/storage/v1/object/public/logos/lionsheader.png"
              alt="Lions Den Law P.C."
              class="h-[40px] w-auto object-contain"
            />

            <div class="space-y-2">
              <p class="font-semibold text-[#0b0f16]">Quick Links</p>

              <ul class="space-y-1">
                <li>
                  <a href="#" class="footer-link"
                    >Disclaimers &amp; Terms of Use</a
                  >
                </li>
                <li>
                  <a href="#" class="footer-link">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" class="footer-link">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>

          <!-- CENTER: EMPTY (intentional spacing like the example site) -->
          <div></div>

          <!-- RIGHT: DISCLAIMER -->
          <div class="text-[13px] leading-6 text-[#0b0f16]/75">
            <p>
              This site is designed to be accessible to and usable by people
              with and without disabilities. Please contact us if you encounter
              an accessibility or usability issue on this site.
            </p>

            <p class="mt-3">
              Attorney advertising. Prior results do not guarantee a similar
              outcome. Your privacy choices.
            </p>
          </div>
        </div>

        <!-- BOTTOM BAR -->
        <div
          class="mt-10 pt-6 border-t border-slate-200 text-[12px] text-[#0b0f16]/60 space-y-1"
        >
          <p>© 2025 Lions Den Law, PC. All rights reserved.</p>
          <p>123 Main Street, Suite 400, Austin, TX 78701</p>
        </div>
      </div>
    </footer>

    <!-- Tailwind-ish styles (kept inline via <style> for exact control) -->
    <style>
      /* How It Works cards (white page, cards pop in sequence) */
      .how-card {
        background: #ffffff;
        border: 1px solid rgba(15, 23, 42, 0.12);
        border-radius: 18px;
        padding: 28px;
        box-shadow: 0 16px 34px rgba(11, 15, 22, 0.1);

        /* animation initial state */
        opacity: 0;
        transform: translateY(16px) scale(0.98);
        transition: opacity 520ms ease, transform 520ms ease,
          box-shadow 520ms ease;
        will-change: opacity, transform;
      }

      .how-card--show {
        opacity: 1;
        transform: translateY(0px) scale(1);
        box-shadow: 0 22px 46px rgba(11, 15, 22, 0.14);
      }

      /* Respect reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .how-card {
          opacity: 1;
          transform: none;
          transition: none;
        }
      }
      .footer-link {
        color: rgba(11, 15, 22, 0.75);
        text-decoration: none;
        transition: color 140ms ease;
      }

      .footer-link:hover {
        color: rgba(11, 15, 22, 1);
        text-decoration: underline;
      }
      .form-field {
        width: 100%;
        height: 48px;
        border: 1px solid rgba(15, 23, 42, 0.35);
        border-radius: 8px;
        background: #fff;
        padding: 0 14px;
        font-size: 14px;
        outline: none;
      }
      .form-field:focus {
        border-color: rgba(11, 15, 22, 0.65);
        box-shadow: 0 0 0 3px rgba(11, 15, 22, 0.08);
      }
      textarea.form-field {
        height: auto;
        padding: 14px;
      }

      .cta-btn {
        width: min(380px, 100%);
        height: 48px;
        border-radius: 10px;
        font-weight: 800;
        font-size: 16px;
        letter-spacing: 0.2px;

        background: linear-gradient(180deg, #ffcc4a 0%, #f39a13 100%);
        color: #0b0f16;

        box-shadow: 0 8px 14px rgba(11, 15, 22, 0.18);
        border: 1px solid rgba(11, 15, 22, 0.25);

        transition: transform 0.08s ease, filter 0.12s ease;
      }
      .cta-btn:hover {
        filter: brightness(1.03);
      }
      .cta-btn:active {
        transform: translateY(1px);
      }

      /* Animated underline (left -> right) */
      .phone-link {
        position: relative;
        display: inline-block;
        text-decoration: none;
      }
      .phone-link::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -4px;
        width: 100%;
        height: 2px;
        background-color: currentColor;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 220ms ease-in-out;
      }
      .phone-link:hover::after {
        transform: scaleX(1);
      }

      /* Blend panel: looks like a continuation of the hero card */
      .blend-panel {
        width: 100%;
        max-width: 980px;
        margin: 0 auto;

        background: rgba(255, 255, 255, 0.55);
        border: 1px solid rgba(15, 23, 42, 0.1);
        border-radius: 18px;

        padding: 14px;
        box-shadow: 0 18px 34px rgba(11, 15, 22, 0.14);
      }

      /* ✅ Make the image “block style” (less width) */
      .blend-panel--narrow {
        max-width: 720px; /* <- tighter like a centered block */
      }

      /* Large “panel-sized” image */
      .blend-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 14px;
        display: block;
        background: #fff;
      }

      /* ✅ Optional: slightly shorter when it's narrower */
      .blend-image--block {
        height: 520px;
      }

      @media (max-width: 640px) {
        .blend-panel--narrow {
          max-width: 100%;
        }
        .blend-image,
        .blend-image--block {
          height: 360px;
        }
      }

      /* ===========================
     VERDICTS (centered 55% + attached reveal)
     =========================== */

      /* Collapsed row: centered and not full width */
      .verdict-row {
        width: 100%;
        margin: 0; /* wrapper handles centering */
      }

      /* Tablet/mobile: widen for readability */
      @media (max-width: 1024px) {
        .verdict-row {
          width: min(92%, 720px);
        }
      }

      .verdict-row:hover {
        box-shadow: 0 14px 28px rgba(11, 15, 22, 0.12);
        border-color: rgba(11, 15, 22, 0.22);
      }

      /* Inner layout (no max-width needed anymore since row is already capped) */
      .verdict-row__inner {
        width: 100%;
        padding: 18px 18px;
        display: flex;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
      }

      .verdict-row__chev {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: rgba(11, 15, 22, 0.65);
        transition: transform 160ms ease;
        flex-shrink: 0;
      }

      /* Active: pop out + "attach" effect */
      .verdict-row--active {
        transform: translateY(-2px) scale(1.01);
        border-color: rgba(11, 15, 22, 0.35);
        box-shadow: 0 22px 46px rgba(11, 15, 22, 0.18);

        /* attach look */
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }

      /* Reveal wrapper (animates) */
      .verdict-reveal {
        overflow: hidden;
        max-height: 0px;
        opacity: 0;
        transform: translateY(-6px);
        transition: max-height 240ms ease, opacity 220ms ease,
          transform 220ms ease;
      }

      .verdict-reveal--open {
        max-height: 720px;
        opacity: 1;
        transform: translateY(0px);
      }

      /* Reveal inner matches the same centered width as the row */
      .verdict-reveal__inner {
        width: 55%;
        margin: 0 auto;
        padding: 0; /* we add padding on the attached panel below */
      }

      @media (max-width: 1024px) {
        .verdict-reveal__inner {
          width: min(92%, 720px);
        }
      }

      /* The "same page / attached card" look */
      .verdict-reveal__inner {
        width: 100%;
        margin: 0;
      }

      /* Optional: make detail boxes match the site's card vibe */
      .detail-card {
        border-radius: 14px;
        border: 1px solid rgba(15, 23, 42, 0.12);
        background: rgba(255, 255, 255, 0.8);
        padding: 14px;
        box-shadow: 0 10px 22px rgba(11, 15, 22, 0.08);
      }
    </style>
  `,
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('howItWorksSection', { static: false })
  howItWorksSection!: ElementRef<HTMLElement>;

  howStepsVisible: boolean[] = [false, false, false];

  private howObserver?: IntersectionObserver;
  private howTriggered = false;

  isSubmitting = false;
  submitSuccess = false;
  submitError: string | null = null;

  model = {
    firstName: '',
    lastName: '',
    phone: '',
    zip: '',
    email: '',
    caseType: '',
    description: '',
    consent: false,
  };

  caseTypeOptions: CaseTypeOption[] = [
    { value: 'Construction Accidents', label: 'Construction Accidents' },
    { value: 'Motor Vehicle Accidents', label: 'Motor Vehicle Accidents' },
    { value: 'Slip & Fall / Premises', label: 'Slip & Fall / Premises' },
    { value: 'General Negligence', label: 'General Negligence' },
  ];

  // ✅ Placeholder verdicts (swap later with real data)
  verdicts: VerdictItem[] = [
    {
      title: 'Jacob T. Rodgers v. City of Gainesville',
      summary:
        'FAKE DATA: Civil rights and injury claim involving a public entity. Case resolution achieved after extensive motion practice and expert testimony.',
      amountLabel: '$2.1 Million',
      resultLabel: 'Settlement',
      preTrialOfferLabel: 'Pre-Suit Offer',
      preTrialOfferValue: '$45,000',
    },
    {
      title: 'Jessica Long v. The Travelers Home',
      summary:
        'FAKE DATA: Rear-end motor vehicle collision. Significant recovery obtained after beating a low pre-trial offer and presenting strong medical causation evidence.',
      amountLabel: '$16.4 Million',
      resultLabel: 'Verdict',
      preTrialOfferLabel: 'Pre-Trial Offer',
      preTrialOfferValue: '$16,000',
    },
    {
      title: 'Carol Reed v. Life Care Centers of America',
      summary:
        'FAKE DATA: Negligent care case involving major injuries. Resolution reflects accountability and long-term care costs.',
      amountLabel: '$4.8 Million',
      resultLabel: 'Settlement',
      preTrialOfferLabel: 'Pre-Trial Offer',
      preTrialOfferValue: '$120,000',
    },
    {
      title: 'Parks-Coleman, Shachari v. Thompson, William',
      summary:
        'FAKE DATA: Premises liability claim with disputed liability. Recovery obtained after discovery revealed critical maintenance failures.',
      amountLabel: '$1.35 Million',
      resultLabel: 'Settlement',
      preTrialOfferLabel: 'Pre-Suit Offer',
      preTrialOfferValue: '$25,000',
    },
  ];

  // ✅ Click to open/close (only one open at a time)
  openVerdictIndex: number | null = 0; // first one open by default

  constructor(private supabase: SupabaseService) {}

  ngAfterViewInit() {
    this.howObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        // only run once
        if (this.howTriggered) return;
        this.howTriggered = true;

        // reveal in sequence
        this.revealHowStepsInSequence();

        // stop observing after trigger
        this.howObserver?.disconnect();
      },
      { threshold: 0.2 } // triggers when ~20% of the section is visible
    );

    this.howObserver.observe(this.howItWorksSection.nativeElement);
  }

  ngOnDestroy() {
    this.howObserver?.disconnect();
  }

  private revealHowStepsInSequence() {
    // step 1
    setTimeout(() => (this.howStepsVisible[0] = true), 0);
    // step 2
    setTimeout(() => (this.howStepsVisible[1] = true), 140);
    // step 3
    setTimeout(() => (this.howStepsVisible[2] = true), 280);
  }

  toggleVerdict(i: number) {
    this.openVerdictIndex = this.openVerdictIndex === i ? null : i;
  }

  async onSubmit() {
    this.submitError = null;
    this.submitSuccess = false;

    // Basic validation
    if (
      !this.model.firstName ||
      !this.model.lastName ||
      !this.model.phone ||
      !this.model.email
    ) {
      this.submitError =
        'Please fill out First Name, Last Name, Phone Number, and Email.';
      return;
    }

    this.isSubmitting = true;

    try {
      await this.supabase.createLead({
        first_name: this.model.firstName.trim(),
        last_name: this.model.lastName.trim(),
        phone_number: this.model.phone.trim(),
        zip_code: this.model.zip?.trim() || null,
        email: this.model.email.trim().toLowerCase(),
        case_type: this.model.caseType || null,
        description: this.model.description?.trim() || null,
        consent: !!this.model.consent,
      });

      this.submitSuccess = true;

      // reset form
      this.model = {
        firstName: '',
        lastName: '',
        phone: '',
        zip: '',
        email: '',
        caseType: '',
        description: '',
        consent: false,
      };
    } catch (err: any) {
      console.error(err);
      this.submitError =
        err?.message || 'There was an issue submitting your claim.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
