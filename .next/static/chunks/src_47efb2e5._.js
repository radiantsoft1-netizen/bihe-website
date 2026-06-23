(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/shared-reveal-observer.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "observeReveal",
    ()=>observeReveal
]);
const callbacks = new WeakMap();
const observed = new Set();
let observer = null;
let scrollFallbackAttached = false;
function isInRevealViewport(el) {
    const rect = el.getBoundingClientRect();
    const viewH = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < viewH * 0.94 && rect.bottom > viewH * 0.06;
}
function revealElement(el) {
    const onVisible = callbacks.get(el);
    if (!onVisible) return;
    onVisible();
    observer === null || observer === void 0 ? void 0 : observer.unobserve(el);
    callbacks.delete(el);
    observed.delete(el);
}
function checkObservedElements() {
    for (const el of observed){
        if (isInRevealViewport(el)) {
            revealElement(el);
        }
    }
}
function attachScrollFallback() {
    if (scrollFallbackAttached || "object" === "undefined") return;
    scrollFallbackAttached = true;
    window.addEventListener("scroll", checkObservedElements, {
        passive: true
    });
    const bindLenis = ()=>{
        const lenis = window.__lenis;
        lenis === null || lenis === void 0 ? void 0 : lenis.on("scroll", checkObservedElements);
    };
    const hasLenis = Boolean(window.__lenis);
    if (hasLenis) {
        bindLenis();
    } else {
        window.addEventListener("lenis:ready", bindLenis, {
            once: true
        });
    }
}
function getObserver() {
    if (observer || typeof IntersectionObserver === "undefined") {
        return observer;
    }
    observer = new IntersectionObserver((entries)=>{
        for (const entry of entries){
            if (!entry.isIntersecting) continue;
            revealElement(entry.target);
        }
    }, {
        threshold: 0.05,
        rootMargin: "0px 0px -2% 0px"
    });
    attachScrollFallback();
    return observer;
}
function observeReveal(el, onVisible) {
    const obs = getObserver();
    if (!obs) {
        onVisible();
        return ()=>{};
    }
    callbacks.set(el, onVisible);
    observed.add(el);
    obs.observe(el);
    attachScrollFallback();
    requestAnimationFrame(()=>{
        if (observed.has(el) && isInRevealViewport(el)) {
            revealElement(el);
        }
    });
    return ()=>{
        obs.unobserve(el);
        callbacks.delete(el);
        observed.delete(el);
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Reveal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Reveal",
    ()=>Reveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$shared$2d$reveal$2d$observer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/shared-reveal-observer.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Reveal(param) {
    let { children, className = "", delay = 0, direction = "up", as: Tag = "div" } = param;
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Reveal.useEffect": ()=>{
            const el = ref.current;
            if (!el) return;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$shared$2d$reveal$2d$observer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observeReveal"])(el, {
                "Reveal.useEffect": ()=>setVisible(true)
            }["Reveal.useEffect"]);
        }
    }["Reveal.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
        ref: ref,
        className: "reveal reveal--".concat(direction).concat(visible ? " is-visible" : "").concat(className ? " ".concat(className) : ""),
        style: {
            transitionDelay: "".concat(delay, "ms")
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Reveal.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(Reveal, "F7BtIAxVh3vOWU1Jr24RYsj9CHc=");
_c = Reveal;
var _c;
__turbopack_context__.k.register(_c, "Reveal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/faculty-pages.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FACULTY_DEPARTMENT_TITLES",
    ()=>FACULTY_DEPARTMENT_TITLES,
    "FACULTY_PAGES",
    ()=>FACULTY_PAGES,
    "FACULTY_PAGE_SLUGS",
    ()=>FACULTY_PAGE_SLUGS,
    "getFacultyPageConfig",
    ()=>getFacultyPageConfig,
    "isFacultyPageSlug",
    ()=>isFacultyPageSlug
]);
const FACULTY_DEPARTMENT_TITLES = {
    "b-com": "B.Com Faculty",
    bca: "BCA Faculty",
    "non-teaching-staff": "Non Teaching Staff"
};
const FACULTY_PAGES = {
    "b-com-faculty": {
        slug: "b-com-faculty",
        department: "b-com",
        currentPage: "B.Com Faculty",
        title: "B.Com Faculty",
        lead: "Experienced faculty members guiding the Bachelor of Commerce programme with strong foundations in commerce, accounting, and management.",
        href: "/academics/b-com-faculty"
    },
    "bca-faculty": {
        slug: "bca-faculty",
        department: "bca",
        currentPage: "BCA Faculty",
        title: "BCA Faculty",
        lead: "Dedicated faculty supporting the Bachelor of Computer Applications programme through practical learning and industry-aligned instruction.",
        href: "/academics/bca-faculty"
    },
    "non-teaching-staff": {
        slug: "non-teaching-staff",
        department: "non-teaching-staff",
        currentPage: "Non Teaching Staff",
        title: "Non Teaching Staff",
        lead: "Administrative and support staff who coordinate day-to-day operations and student services across BIHE departments.",
        href: "/academics/non-teaching-staff"
    }
};
const FACULTY_PAGE_SLUGS = [
    "bca-faculty",
    "b-com-faculty",
    "non-teaching-staff"
];
function isFacultyPageSlug(slug) {
    return slug in FACULTY_PAGES;
}
function getFacultyPageConfig(slug) {
    return FACULTY_PAGES[slug];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/academics-faculty-nav.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACADEMICS_FACULTY_NAV",
    ()=>ACADEMICS_FACULTY_NAV,
    "isAcademicsFacultyNavActive",
    ()=>isAcademicsFacultyNavActive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$faculty$2d$pages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/faculty-pages.ts [app-client] (ecmascript)");
;
const ACADEMICS_FACULTY_NAV = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$faculty$2d$pages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FACULTY_PAGE_SLUGS"].map(_c = (slug)=>({
        id: slug,
        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$faculty$2d$pages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FACULTY_PAGES"][slug].title,
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$faculty$2d$pages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FACULTY_PAGES"][slug].href,
        matchPaths: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$faculty$2d$pages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FACULTY_PAGES"][slug].href
        ]
    }));
_c1 = ACADEMICS_FACULTY_NAV;
function isAcademicsFacultyNavActive(pathname, item) {
    return item.matchPaths.some((path)=>pathname === path || pathname.startsWith("".concat(path, "/")));
}
var _c, _c1;
__turbopack_context__.k.register(_c, "ACADEMICS_FACULTY_NAV$FACULTY_PAGE_SLUGS.map");
__turbopack_context__.k.register(_c1, "ACADEMICS_FACULTY_NAV");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/academics/AcademicsFacultyNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AcademicsFacultyNav",
    ()=>AcademicsFacultyNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$academics$2d$faculty$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/academics-faculty-nav.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AcademicsFacultyNav() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "admissions-page-nav",
        "aria-label": "Academics faculty navigation",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "admissions-page-nav__container",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "admissions-page-nav__list",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$academics$2d$faculty$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACADEMICS_FACULTY_NAV"].map((item)=>{
                    const isActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$academics$2d$faculty$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAcademicsFacultyNavActive"])(pathname, item);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "admissions-page-nav__item",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: item.href,
                            className: [
                                "admissions-page-nav__link",
                                isActive ? "admissions-page-nav__link--active" : ""
                            ].filter(Boolean).join(" "),
                            "aria-current": isActive ? "page" : undefined,
                            children: item.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/academics/AcademicsFacultyNav.tsx",
                            lineNumber: 22,
                            columnNumber: 17
                        }, this)
                    }, item.id, false, {
                        fileName: "[project]/src/components/academics/AcademicsFacultyNav.tsx",
                        lineNumber: 21,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/academics/AcademicsFacultyNav.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/academics/AcademicsFacultyNav.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/academics/AcademicsFacultyNav.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(AcademicsFacultyNav, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = AcademicsFacultyNav;
var _c;
__turbopack_context__.k.register(_c, "AcademicsFacultyNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/academics/FacultyStaffIntro.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FacultyStaffIntro",
    ()=>FacultyStaffIntro
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Reveal.tsx [app-client] (ecmascript)");
"use client";
;
;
function FacultyStaffIntro(param) {
    let { title, id } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "b-com-admin__faculty-intro",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Reveal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
            direction: "up",
            delay: 0,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "b-com-admin__faculty-title",
                id: id,
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/academics/FacultyStaffIntro.tsx",
                lineNumber: 14,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/academics/FacultyStaffIntro.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/academics/FacultyStaffIntro.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = FacultyStaffIntro;
var _c;
__turbopack_context__.k.register(_c, "FacultyStaffIntro");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/images.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Canonical image files under /public/images */ __turbopack_context__.s([
    "encodeStoragePath",
    ()=>encodeStoragePath,
    "figmaSources",
    ()=>figmaSources,
    "imageRewriteMap",
    ()=>imageRewriteMap,
    "images",
    ()=>images,
    "resolveImagePath",
    ()=>resolveImagePath,
    "resolveImageSrc",
    ()=>resolveImageSrc,
    "toPublicStoragePath",
    ()=>toPublicStoragePath
]);
const imageRewriteMap = {
    logo: "/images/logo.webp",
    hero: "/images/hero.webp",
    "about-main": "/images/about-main.webp",
    "about-bihe-campus": "/images/about-bihe-campus-building.png",
    "ombudsperson-intro": "/images/ombudsperson-intro.png",
    "about-badge": "/images/about-badge.webp",
    principal: "/images/principal.png",
    "finance-section": "/images/finance-section-fda.jpg",
    "gb-hon-secretary": "/images/governing-bodies-hon-secretary.png",
    "gb-joint-secretary": "/images/governing-bodies-joint-secretary.png",
    "gb-chairman": "/images/governing-bodies-chairman.png",
    "icc-objectives": "/images/icc-objectives-infographic.png",
    "bca-vice-principal": "/images/bca-vice-principal.png",
    "bca-hod": "/images/bca-hod.png",
    "bca-dean": "/images/bca-dean.png",
    "bcom-hod": "/images/bcom-hod.png",
    "bca-campus": "/images/bca-campus.png",
    "bca-lab": "/images/bca-lab.webp",
    bcom: "/images/bcom.webp",
    "bcom-department": "/images/bcom-department.png",
    "bcom-programme-student-1": "/images/bcom-programme-student-1.png",
    "bcom-programme-students": "/images/bcom-programme-students.png",
    "bcom-programme-student-2": "/images/bcom-programme-student-2.png",
    "exam-internal-main": "/images/exam-internal-main.jpg",
    "coe-exam-intro-main": "/images/coe-exam-intro-main.png",
    "exam-internal-panel-1": "/images/exam-internal-panel-1.jpg",
    "exam-internal-panel-2": "/images/exam-internal-panel-2.jpg",
    "exam-university-main": "/images/exam-university-main.jpg",
    "exam-university-panel-1": "/images/exam-university-panel-1.jpg",
    "exam-university-panel-2": "/images/exam-university-panel-2.jpg",
    "iqac-certified": "/images/iqac-certified.png",
    "iqac-quality-main": "/images/iqac-quality-main.jpg",
    "iqac-quality-panel": "/images/iqac-quality-panel.jpg",
    "world-map": "/images/world-map.webp",
    "idp-campus": "/images/idp-campus.webp",
    "idp-vision-mission": "/images/idp-vision-mission.png",
    "idp-academic-growth": "/images/idp-academic-growth.png",
    "facility-library": "/images/facility-library.webp",
    "library-intro": "/images/library-intro-campus.jpg",
    "library-gallery-reading-hall": "/images/library-gallery-reading-hall.png",
    "library-gallery-group-study": "/images/library-gallery-group-study.png",
    "library-gallery-bookshelves": "/images/library-gallery-bookshelves.png",
    "facility-computer-labs": "/images/facility-computer-labs.webp",
    "differently-abled-wheelchair-facility": "/images/differently-abled-wheelchair-facility.png",
    "differently-abled-ramps-railings": "/images/differently-abled-ramps-railings.png",
    "differently-abled-accessible-classrooms": "/images/differently-abled-accessible-classrooms.png",
    "differently-abled-scribe-examination": "/images/differently-abled-scribe-examination.png",
    "differently-abled-special-teaching": "/images/differently-abled-special-teaching.png",
    "differently-abled-library-facilities": "/images/differently-abled-library-facilities.png",
    "facility-hostel": "/images/facility-hostel.webp",
    "facility-placement": "/images/facility-placement.webp",
    "facility-extracurricular": "/images/facility-extracurricular.webp",
    "facility-canteen": "/images/facility-canteen.webp",
    "facility-sports": "/images/facility-sports.webp",
    "facility-auditorium": "/images/facility-auditorium.webp",
    "news-1": "/images/news-1.webp",
    "news-2": "/images/news-2.webp",
    "news-3": "/images/news-3.webp",
    "news-4": "/images/news-4.webp",
    "accreditation-1": "/images/accreditation-1.webp",
    "accreditation-2": "/images/accreditation-2.webp",
    "accreditation-3": "/images/accreditation-3.webp",
    "accreditation-4": "/images/accreditation-4.webp",
    "accreditation-5": "/images/accreditation-5.webp",
    "recruiter-1": "/images/recruiter-1.webp",
    "recruiter-2": "/images/recruiter-2.webp",
    "recruiter-3": "/images/recruiter-3.webp",
    "recruiter-4": "/images/recruiter-4.webp",
    "recruiter-5": "/images/recruiter-5.webp",
    "recruiter-6": "/images/recruiter-6.webp",
    "recruiter-7": "/images/recruiter-7.webp",
    "recruiter-8": "/images/recruiter-8.webp",
    "recruiter-9": "/images/recruiter-9.webp",
    "recruiter-10": "/images/recruiter-10.webp",
    "recruiter-11": "/images/recruiter-11.webp",
    "recruiter-12": "/images/recruiter-12.webp",
    "uucms-new-candidate-registration": "/images/uucms-new-candidate-registration.png",
    "admission-process-student": "/images/admission-process-student.png",
    "international-students-admission-process": "/images/international-students-admission-process.png",
    "international-students-eligibility-documents": "/images/international-students-eligibility-documents.png",
    "international-students-library-facilities": "/images/international-students-library-facilities.png",
    "international-students-facilities": "/images/international-students-facilities.png",
    "international-students-hostel-facilities": "/images/international-students-hostel-facilities.png",
    "international-students-lab-facilities": "/images/international-students-lab-facilities.png",
    "international-students-guidance-support": "/images/international-students-guidance-support.png",
    "international-students-health-facilities": "/images/international-students-health-facilities.png",
    "admission-process-staff": "/images/admission-process-staff.png",
    "admission-process-bcom-student": "/images/admission-process-bcom-student.png",
    "admission-process-bcom-staff": "/images/admission-process-bcom-staff.png",
    "admission-process-support-student": "/images/admission-process-support-student.png",
    "admission-process-support-staff": "/images/admission-process-support-staff.png",
    "rdc-electricity-1": "/images/rdc/electricity-1.png",
    "rdc-electricity-2": "/images/rdc/electricity-2.png",
    "rdc-skin-cancer-1": "/images/rdc/skin-cancer-1.png",
    "rdc-skin-cancer-2": "/images/rdc/skin-cancer-2.png",
    "rdc-biometric-1": "/images/rdc/biometric-1.png",
    "rdc-biometric-2": "/images/rdc/biometric-2.png",
    "rdc-churn-1": "/images/rdc/churn-1.png",
    "rdc-churn-2": "/images/rdc/churn-2.png",
    "rdc-emission-1": "/images/rdc/emission-1.png",
    "rdc-emission-2": "/images/rdc/emission-2.png",
    "academic-projects-preview": "/images/academic-projects/preview.webp",
    "incubation-why-primary": "/images/incubation/why-primary.png",
    "incubation-why-secondary": "/images/incubation/why-secondary.png",
    "incubation-beneficiary-primary": "/images/incubation/beneficiary-primary.png",
    "incubation-beneficiary-secondary": "/images/incubation/beneficiary-secondary.png",
    "crf-library": "/images/crf/library.png",
    "crf-computer-laboratories": "/images/crf/computer-laboratories.png",
    "sports-events-celebration": "/images/sports/inter-college/events-volleyball.jpg",
    "sports-facilities-banner": "/images/sports/sports-facilities-hero.jpg",
    "sports-badminton-tournament": "/images/sports/badminton-tournament.png",
    "sports-chess-tournament": "/images/sports/chess-tournament.png",
    "sports-football-tournament": "/images/sports/inter-college/football-match.jpg",
    "sports-football-ground": "/images/sports/football-ground.jpg",
    "sports-basketball-court": "/images/sports/basketball-court.jpg",
    "sports-table-tennis-tournament": "/images/sports/table-tennis-tournament.png",
    "nss-emblem": "/images/nss/National-Service-scheme.png",
    "nss-hero-banner": "/images/nss/nss-hero-banner.jpg",
    "nss-featured-event": "/images/nss/NSS1-1.jpg",
    "nss-officer-siddalingappa": "/images/nss/SIDDLINGAPPA-SIR.jpg",
    "nss-officer-sadashivappa": "/images/nss/SADASHIVAPPA-SIR.jpg",
    "nss-gallery-1": "/images/nss/nss-environmental-tree-planting.png",
    "nss-gallery-2": "/images/nss/nss-eye-checkup-camp.png",
    "nss-gallery-3": "/images/nss/nss-swachh-abhiyan-campaign.png",
    "nss-gallery-4": "/images/nss/NSS5.jpg",
    "nss-gallery-5": "/images/nss/NSS6-1.jpg",
    "sl-hostel-1": "/images/student-life/hostel/1.jpg",
    "sl-hostel-banner": "/images/student-life/hostel/hostel-banner.png",
    "sl-hostel-2": "/images/student-life/hostel/2.jpg",
    "sl-hostel-3": "/images/student-life/hostel/3.jpg",
    "sl-placement-officer": "/images/student-life/placement/officer.jpg",
    "sl-computer-lab-1": "/images/student-life/computer-lab/1.jpg",
    "sl-computer-lab-2": "/images/student-life/computer-lab/2.jpg",
    "sl-auditorium-1": "/images/student-life/auditorium/1.jpg",
    "sl-auditorium-2": "/images/student-life/auditorium/2.png",
    "sl-auditorium-3": "/images/student-life/auditorium/3.png",
    "sl-auditorium-4": "/images/student-life/auditorium/4.png",
    "sl-canteen-1": "/images/student-life/canteen/1.jpg",
    "sl-canteen-2": "/images/student-life/canteen/2.jpg",
    "sl-yrc-banner": "/images/student-life/yrc/banner.png",
    "sl-yrc-officer": "/images/student-life/yrc/officer-portrait.jpg",
    "sl-yrc-activity-peace-walkathon": "/images/student-life/yrc/activities/peace-walkathon.jpg",
    "sl-yrc-activity-blood-donation-camp": "/images/student-life/yrc/activities/blood-donation-camp.jpg",
    "sl-yrc-activity-blood-donation-drive": "/images/student-life/yrc/activities/blood-donation-drive.jpg",
    "sl-yrc-activity-wellbeing-seminar": "/images/student-life/yrc/activities/wellbeing-seminar.jpg",
    "mpd-hr-interview": "/images/mega-placement-drive/hr-interview-process.png",
    "mpd-inaugural-ceremony": "/images/mega-placement-drive/inaugural-ceremony.png",
    "mpd-company-hr-interviews": "/images/mega-placement-drive/company-hr-interviews.png",
    "mpd-offer-letters-banner": "/images/mega-placement-drive/offer-letters-banner.png",
    "placement-bca-batch-2025-26": "/images/placement/placement-bca-batch-2025-26.png",
    "health-first-aid-kit": "/images/health-facilities/first-aid-kit-highlight.png",
    "health-awareness-camp": "/images/health-facilities/health-awareness-camp.png",
    "health-fire-safety": "/images/health-facilities/fire-safety-training.png",
    "health-banner": "/images/health-facilities/health-banner-first-aid.png",
    "anti-ragging-banner": "/images/anti-ragging/banner.png",
    "anti-ragging-awareness": "/images/anti-ragging/awareness-programme.jpg",
    "alumni-home-welcome": "/images/alumni/alumni-home-welcome.jpg",
    "alumni-about-mission": "/images/alumni/alumni-about-mission.jpg",
    "alumni-about-objectives": "/images/alumni/alumni-about-objectives.jpg"
};
const short = (slug)=>"/i/".concat(slug);
const images = {
    logo: short("logo"),
    hero: short("hero"),
    aboutMain: short("about-main"),
    aboutBiheCampus: short("about-bihe-campus"),
    alumniHomeWelcome: short("alumni-home-welcome"),
    alumniAboutMission: short("alumni-about-mission"),
    alumniAboutObjectives: short("alumni-about-objectives"),
    ombudspersonIntro: short("ombudsperson-intro"),
    aboutBadge: short("about-badge"),
    principal: short("principal"),
    financeSection: short("finance-section"),
    governingBodiesHonSecretary: short("gb-hon-secretary"),
    governingBodiesJointSecretary: short("gb-joint-secretary"),
    governingBodiesChairman: short("gb-chairman"),
    iccObjectivesInfographic: short("icc-objectives"),
    bcaVicePrincipal: short("bca-vice-principal"),
    bcaHod: short("bca-hod"),
    bcaDean: short("bca-dean"),
    bcomHod: short("bcom-hod"),
    bcaCampus: short("bca-campus"),
    bcaLab: short("bca-lab"),
    bcom: short("bcom"),
    bcomDepartment: short("bcom-department"),
    bcomProgrammeStudent1: short("bcom-programme-student-1"),
    bcomProgrammeStudents: short("bcom-programme-students"),
    bcomProgrammeStudent2: short("bcom-programme-student-2"),
    examInternalMain: short("exam-internal-main"),
    coeExamIntroMain: short("coe-exam-intro-main"),
    examInternalPanel1: short("exam-internal-panel-1"),
    examInternalPanel2: short("exam-internal-panel-2"),
    examUniversityMain: short("exam-university-main"),
    examUniversityPanel1: short("exam-university-panel-1"),
    examUniversityPanel2: short("exam-university-panel-2"),
    iqacCertified: short("iqac-certified"),
    iqacQualityMain: short("iqac-quality-main"),
    iqacQualityPanel: short("iqac-quality-panel"),
    worldMap: short("world-map"),
    idpCampus: short("idp-campus"),
    idpVisionMission: short("idp-vision-mission"),
    idpAcademicGrowth: short("idp-academic-growth"),
    libraryIntro: short("library-intro"),
    libraryGallery: {
        readingHall: short("library-gallery-reading-hall"),
        groupStudy: short("library-gallery-group-study"),
        bookshelves: short("library-gallery-bookshelves")
    },
    facility: {
        library: short("facility-library"),
        computerLabs: short("facility-computer-labs"),
        hostel: short("facility-hostel"),
        placement: short("facility-placement"),
        extracurricular: short("facility-extracurricular"),
        canteen: short("facility-canteen"),
        sports: short("facility-sports"),
        auditorium: short("facility-auditorium")
    },
    news: [
        short("news-1"),
        short("news-2"),
        short("news-3"),
        short("news-4")
    ],
    accreditation: [
        short("accreditation-1"),
        short("accreditation-2"),
        short("accreditation-3"),
        short("accreditation-4"),
        short("accreditation-5")
    ],
    recruiters: [
        short("recruiter-1"),
        short("recruiter-2"),
        short("recruiter-3"),
        short("recruiter-4"),
        short("recruiter-5"),
        short("recruiter-6"),
        short("recruiter-7"),
        short("recruiter-8"),
        short("recruiter-9"),
        short("recruiter-10"),
        short("recruiter-11"),
        short("recruiter-12")
    ],
    uucmsNewCandidateRegistration: short("uucms-new-candidate-registration"),
    admissionProcessStudent: short("admission-process-student"),
    internationalStudentsAdmissionProcess: short("international-students-admission-process"),
    internationalStudentsEligibilityDocuments: short("international-students-eligibility-documents"),
    internationalStudentsLibraryFacilities: short("international-students-library-facilities"),
    internationalStudentsFacilities: short("international-students-facilities"),
    internationalStudentsHostelFacilities: short("international-students-hostel-facilities"),
    internationalStudentsLabFacilities: short("international-students-lab-facilities"),
    internationalStudentsGuidanceSupport: short("international-students-guidance-support"),
    internationalStudentsHealthFacilities: short("international-students-health-facilities"),
    admissionProcessStaff: short("admission-process-staff"),
    admissionProcessBcomStudent: short("admission-process-bcom-student"),
    admissionProcessBcomStaff: short("admission-process-bcom-staff"),
    admissionProcessSupportStudent: short("admission-process-support-student"),
    admissionProcessSupportStaff: short("admission-process-support-staff"),
    rdcElectricity1: short("rdc-electricity-1"),
    rdcElectricity2: short("rdc-electricity-2"),
    rdcSkinCancer1: short("rdc-skin-cancer-1"),
    rdcSkinCancer2: short("rdc-skin-cancer-2"),
    rdcBiometric1: short("rdc-biometric-1"),
    rdcBiometric2: short("rdc-biometric-2"),
    rdcChurn1: short("rdc-churn-1"),
    rdcChurn2: short("rdc-churn-2"),
    rdcEmission1: short("rdc-emission-1"),
    rdcEmission2: short("rdc-emission-2"),
    academicProjectsPreview: short("academic-projects-preview"),
    incubationWhyPrimary: short("incubation-why-primary"),
    incubationWhySecondary: short("incubation-why-secondary"),
    incubationBeneficiaryPrimary: short("incubation-beneficiary-primary"),
    incubationBeneficiarySecondary: short("incubation-beneficiary-secondary"),
    crfLibrary: short("crf-library"),
    crfComputerLaboratories: short("crf-computer-laboratories"),
    nssDetails: {
        emblem: short("nss-emblem"),
        heroBanner: short("nss-hero-banner"),
        featuredEvent: short("nss-featured-event"),
        officerSiddalingappa: short("nss-officer-siddalingappa"),
        officerSadashivappa: short("nss-officer-sadashivappa"),
        gallery1: short("nss-gallery-1"),
        gallery2: short("nss-gallery-2"),
        gallery3: short("nss-gallery-3"),
        gallery4: short("nss-gallery-4"),
        gallery5: short("nss-gallery-5")
    },
    studentLife: {
        hostel1: short("sl-hostel-1"),
        hostel2: short("sl-hostel-2"),
        hostel3: short("sl-hostel-3"),
        placementOfficer: short("sl-placement-officer"),
        computerLab1: short("sl-computer-lab-1"),
        computerLab2: short("sl-computer-lab-2"),
        auditorium1: short("sl-auditorium-1"),
        auditorium2: short("sl-auditorium-2"),
        auditorium3: short("sl-auditorium-3"),
        auditorium4: short("sl-auditorium-4"),
        canteen1: short("sl-canteen-1"),
        canteen2: short("sl-canteen-2"),
        yrcBanner: short("sl-yrc-banner"),
        yrcOfficer: short("sl-yrc-officer"),
        yrcActivityPeaceWalkathon: short("sl-yrc-activity-peace-walkathon"),
        yrcActivityBloodDonationCamp: short("sl-yrc-activity-blood-donation-camp"),
        yrcActivityBloodDonationDrive: short("sl-yrc-activity-blood-donation-drive"),
        yrcActivityWellbeingSeminar: short("sl-yrc-activity-wellbeing-seminar"),
        hostelBanner: short("sl-hostel-banner"),
        placementBanner: short("facility-placement"),
        healthBanner: short("facility-hostel"),
        grievanceBanner: short("about-main"),
        antiRaggingBanner: short("anti-ragging-banner"),
        equalOpportunityBanner: short("facility-extracurricular"),
        sedgBanner: short("facility-library"),
        differentlyAbledBanner: short("differently-abled-wheelchair-facility"),
        differentlyAbledRampsRailings: short("differently-abled-ramps-railings"),
        differentlyAbledAccessibleClassrooms: short("differently-abled-accessible-classrooms"),
        differentlyAbledScribeExamination: short("differently-abled-scribe-examination"),
        differentlyAbledSpecialTeaching: short("differently-abled-special-teaching"),
        differentlyAbledLibraryFacilities: short("differently-abled-library-facilities"),
        computerLabBanner: short("sl-computer-lab-1"),
        auditoriumBanner: short("sl-auditorium-1"),
        canteenBanner: short("sl-canteen-1")
    },
    megaPlacementDrive: {
        hrInterview: short("mpd-hr-interview"),
        inauguralCeremony: short("mpd-inaugural-ceremony"),
        companyHrInterviews: short("mpd-company-hr-interviews"),
        offerLettersBanner: short("mpd-offer-letters-banner")
    },
    placement: {
        bcaBatch202526: short("placement-bca-batch-2025-26")
    },
    healthFacilities: {
        firstAidKit: short("health-first-aid-kit"),
        healthAwarenessCamp: short("health-awareness-camp"),
        fireSafetyEquipment: short("health-fire-safety"),
        banner: short("health-banner")
    },
    antiRagging: {
        banner: short("anti-ragging-banner"),
        awarenessProgramme: short("anti-ragging-awareness")
    },
    sportsFacilities: {
        heroBanner: short("sports-facilities-banner"),
        cricketGround: short("facility-sports"),
        basketballCourt: short("sports-basketball-court"),
        footballGround: short("sports-football-ground"),
        events: short("sports-events-celebration"),
        badminton: short("sports-badminton-tournament"),
        footballTournament: short("sports-football-tournament"),
        tableTennis: short("sports-table-tennis-tournament"),
        chess: short("sports-chess-tournament")
    }
};
const figmaSources = {
    "logo.webp": "https://www.figma.com/api/mcp/asset/570bbbb6-e398-4605-936a-f613aa360d29",
    "hero.webp": "https://www.figma.com/api/mcp/asset/eb335cf7-13b8-4421-8bec-742e1402cbe8",
    "about-main.webp": "https://www.figma.com/api/mcp/asset/ed9ccf96-a100-4431-b5ba-b8a0bb0d51b4",
    "about-badge.webp": "https://www.figma.com/api/mcp/asset/ea334caa-dcb3-4ea2-8558-3d328e878a19",
    "bca-lab.webp": "https://www.figma.com/api/mcp/asset/595bb578-04e9-4bff-891c-a22fd57a3f8d",
    "bcom.webp": "https://www.figma.com/api/mcp/asset/2440ff4c-ff00-4d26-9a29-b1a8058b5432",
    "world-map.webp": "https://www.figma.com/api/mcp/asset/bae560d0-5adb-48f7-a257-d7f108bb8bd1",
    "facility-library.webp": "https://www.figma.com/api/mcp/asset/625fdf71-47d3-42ae-b91c-949647155d60",
    "facility-computer-labs.webp": "https://www.figma.com/api/mcp/asset/234d1802-5c89-45c1-9849-3f05e3a9ff01",
    "facility-hostel.webp": "https://www.figma.com/api/mcp/asset/1dff7ba8-6623-4bed-a013-5d7c0c30f537",
    "facility-placement.webp": "https://www.figma.com/api/mcp/asset/44418dc5-4bfb-47e4-af25-3987cbd2fd73",
    "facility-extracurricular.webp": "https://www.figma.com/api/mcp/asset/817421ff-641e-48f9-ac6c-e320b4859e96",
    "facility-canteen.webp": "https://www.figma.com/api/mcp/asset/e8e0dddf-e10f-4d1e-8a0b-743bbb17aa85",
    "facility-sports.webp": "https://www.figma.com/api/mcp/asset/680f81f0-0719-4b6b-9abd-100899cd0d66",
    "facility-auditorium.webp": "https://www.figma.com/api/mcp/asset/3aa65f33-46b3-4a19-8cad-4910874c90d4",
    "news-1.webp": "https://www.figma.com/api/mcp/asset/fb9d4ce6-5707-4efa-8a52-a47adc05ed99",
    "news-2.webp": "https://www.figma.com/api/mcp/asset/2e339c45-9cc0-4525-8f69-33c83213d9fb",
    "news-3.webp": "https://www.figma.com/api/mcp/asset/bf0efe57-e7d0-4436-b478-6a51454d80b4",
    "news-4.webp": "https://www.figma.com/api/mcp/asset/46ac5065-9286-4ea6-bfed-4a974960757c",
    "accreditation-1.webp": "https://www.figma.com/api/mcp/asset/ea334caa-dcb3-4ea2-8558-3d328e878a19",
    "accreditation-2.webp": "https://www.figma.com/api/mcp/asset/a64af101-b7d8-4c7a-8b26-d3cfc7ad02b2",
    "accreditation-3.webp": "https://www.figma.com/api/mcp/asset/ea334caa-dcb3-4ea2-8558-3d328e878a19",
    "accreditation-4.webp": "https://www.figma.com/api/mcp/asset/a64af101-b7d8-4c7a-8b26-d3cfc7ad02b2",
    "accreditation-5.webp": "https://www.figma.com/api/mcp/asset/ea334caa-dcb3-4ea2-8558-3d328e878a19",
    "recruiter-1.webp": "https://www.figma.com/api/mcp/asset/66b2bcdc-4806-48d5-8d1c-01e1dd320d62",
    "recruiter-2.webp": "https://www.figma.com/api/mcp/asset/ab902d57-958e-429e-8ad6-57eb64b970c0",
    "recruiter-3.webp": "https://www.figma.com/api/mcp/asset/18f49987-28ed-4dd8-9ba3-cb4ea4d5584d",
    "recruiter-4.webp": "https://www.figma.com/api/mcp/asset/8f8ffce4-6a20-4f0a-8766-123c29c9d70f",
    "recruiter-5.webp": "https://www.figma.com/api/mcp/asset/8ac3a20d-e2c2-4dbd-b7f8-40b29e3e7f30",
    "recruiter-6.webp": "https://www.figma.com/api/mcp/asset/00a26663-3532-4d46-8c12-8fca9e763d71",
    "recruiter-7.webp": "https://www.figma.com/api/mcp/asset/9f7510f3-5071-45bf-a653-a5f6db913ae0",
    "recruiter-8.webp": "https://www.figma.com/api/mcp/asset/fa104fd4-f755-4c0a-ab11-e2e69d5349bc",
    "recruiter-9.webp": "https://www.figma.com/api/mcp/asset/700eeb8f-53a1-4952-849b-5390e8c02553",
    "recruiter-10.webp": "https://www.figma.com/api/mcp/asset/b65b40d9-84b0-4162-8e50-0d841246ede1",
    "recruiter-11.webp": "https://www.figma.com/api/mcp/asset/f84c6062-18c8-43cc-b160-136d6970bcd8",
    "recruiter-12.webp": "https://www.figma.com/api/mcp/asset/58175b0f-7550-4522-b7e4-6d9ca71014b3"
};
function encodeStoragePath(pathname) {
    return pathname.split("/").map((segment)=>segment === "" ? "" : encodeURIComponent(decodeURIComponent(segment))).join("/");
}
function toPublicStoragePath(src) {
    const trimmed = src === null || src === void 0 ? void 0 : src.trim();
    if (!trimmed) {
        return null;
    }
    var _trimmed_split_;
    const withoutQuery = (_trimmed_split_ = trimmed.split("?")[0]) !== null && _trimmed_split_ !== void 0 ? _trimmed_split_ : trimmed;
    if (withoutQuery.startsWith("/storage/")) {
        return encodeStoragePath(withoutQuery);
    }
    const storageIndex = withoutQuery.indexOf("/storage/");
    if (storageIndex !== -1) {
        return encodeStoragePath(withoutQuery.slice(storageIndex));
    }
    if (!withoutQuery.startsWith("http://") && !withoutQuery.startsWith("https://") && !withoutQuery.startsWith("/")) {
        return encodeStoragePath("/storage/".concat(withoutQuery.replace(/^\/+/, "")));
    }
    if (withoutQuery.startsWith("http://") || withoutQuery.startsWith("https://")) {
        try {
            const url = new URL(withoutQuery);
            if (url.pathname.startsWith("/storage/")) {
                return encodeStoragePath(url.pathname);
            }
        } catch (e) {
            const match = withoutQuery.match(/\/storage\/[^?#]*/);
            if (match === null || match === void 0 ? void 0 : match[0]) {
                return encodeStoragePath(match[0]);
            }
        }
    }
    return null;
}
function resolveImagePath(src) {
    if (src.startsWith("/i/")) {
        const slug = src.slice(3);
        var _imageRewriteMap_slug;
        return (_imageRewriteMap_slug = imageRewriteMap[slug]) !== null && _imageRewriteMap_slug !== void 0 ? _imageRewriteMap_slug : src;
    }
    return src;
}
function resolveImageSrc(src) {
    const storagePath = toPublicStoragePath(src);
    if (storagePath) {
        return storagePath;
    }
    const localPath = resolveImagePath(src);
    if (localPath.startsWith("/images/")) {
        return localPath;
    }
    return src;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/SmartImage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SmartImage",
    ()=>SmartImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$images$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/images.ts [app-client] (ecmascript)");
;
;
;
function isProxiedStoragePath(resolved) {
    return resolved.startsWith("/storage/");
}
function isAdminStorageImage(resolved) {
    if (!resolved.startsWith("http")) {
        return false;
    }
    try {
        const url = new URL(resolved);
        if (!url.pathname.startsWith("/storage/")) {
            return false;
        }
        return url.hostname === "admin.bihe.edu" || url.hostname === "admin.bihedvg.org" || url.hostname === "127.0.0.1" || url.hostname === "localhost";
    } catch (e) {
        return false;
    }
}
function shouldOptimizeImage(resolved) {
    if (isProxiedStoragePath(resolved)) {
        return false;
    }
    if (!resolved.startsWith("http")) {
        return true;
    }
    try {
        const url = new URL(resolved);
        if (url.hostname === "www.figma.com") {
            return false;
        }
        if (isAdminStorageImage(resolved)) {
            return false;
        }
        return true;
    } catch (e) {
        return true;
    }
}
function SmartImage(param) {
    let { src, alt, className, fill, width, height, priority, sizes, quality = 75, unoptimized } = param;
    const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$images$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveImageSrc"])(src);
    const optimized = unoptimized === true ? false : shouldOptimizeImage(resolved);
    if (fill) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: resolved,
            alt: alt,
            fill: true,
            className: className,
            sizes: sizes !== null && sizes !== void 0 ? sizes : "(max-width: 768px) 100vw, 50vw",
            priority: priority,
            quality: quality,
            unoptimized: !optimized
        }, void 0, false, {
            fileName: "[project]/src/components/ui/SmartImage.tsx",
            lineNumber: 88,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        src: resolved,
        alt: alt,
        width: width !== null && width !== void 0 ? width : 800,
        height: height !== null && height !== void 0 ? height : 600,
        className: className,
        priority: priority,
        quality: quality,
        unoptimized: !optimized
    }, void 0, false, {
        fileName: "[project]/src/components/ui/SmartImage.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_c = SmartImage;
var _c;
__turbopack_context__.k.register(_c, "SmartImage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/icons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowRightIcon",
    ()=>ArrowRightIcon,
    "ChevronLeftIcon",
    ()=>ChevronLeftIcon,
    "ChevronRightIcon",
    ()=>ChevronRightIcon,
    "FacebookIcon",
    ()=>FacebookIcon,
    "InstagramIcon",
    ()=>InstagramIcon,
    "LinkedInIcon",
    ()=>LinkedInIcon,
    "MortarboardIcon",
    ()=>MortarboardIcon,
    "PdfFileIcon",
    ()=>PdfFileIcon,
    "YouTubeIcon",
    ()=>YouTubeIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function MortarboardIcon() {
    let { className } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9 12 3zm0 2.27l6.18 3.45L12 12.18 5.82 8.72 12 5.27zM7 11.09v4.36L12 18l5-2.55v-4.36L12 14.55 7 11.09z"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/icons.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/icons.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = MortarboardIcon;
function ArrowRightIcon() {
    let { className = "btn__icon" } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 20 20",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 10h12"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/icons.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M11 5l5 5-5 5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/icons.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/icons.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c1 = ArrowRightIcon;
function ChevronLeftIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "hero__chevron-icon",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M15 6l-6 6 6 6"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/icons.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/icons.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c2 = ChevronLeftIcon;
function PdfFileIcon() {
    let { className } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.75",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/icons.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 2v6h6"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/icons.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 13h4M10 17h4M8 13h.01M8 17h.01"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/icons.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/icons.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c3 = PdfFileIcon;
function ChevronRightIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "hero__chevron-icon",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M9 6l6 6-6 6"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/icons.tsx",
            lineNumber: 87,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/icons.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_c4 = ChevronRightIcon;
const SOCIAL_STROKE = 1.85;
const socialStroke = {
    stroke: "currentColor",
    strokeWidth: SOCIAL_STROKE,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
function SocialSvg(param) {
    let { className, size = 24, children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": true,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/icons.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c5 = SocialSvg;
function FacebookIcon() {
    let { className, size = 24 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SocialSvg, {
        className: className,
        size: size,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
            ...socialStroke
        }, void 0, false, {
            fileName: "[project]/src/components/ui/icons.tsx",
            lineNumber: 128,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/icons.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
_c6 = FacebookIcon;
function LinkedInIcon() {
    let { className, size = 24 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SocialSvg, {
        className: className,
        size: size,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
                ...socialStroke
            }, void 0, false, {
                fileName: "[project]/src/components/ui/icons.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "2",
                y: "9",
                width: "4",
                height: "12",
                ...socialStroke
            }, void 0, false, {
                fileName: "[project]/src/components/ui/icons.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "4",
                cy: "4",
                r: "2",
                ...socialStroke
            }, void 0, false, {
                fileName: "[project]/src/components/ui/icons.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/icons.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
_c7 = LinkedInIcon;
function YouTubeIcon() {
    let { className, size = 24 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SocialSvg, {
        className: className,
        size: size,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
                ...socialStroke
            }, void 0, false, {
                fileName: "[project]/src/components/ui/icons.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m10 15 5-3-5-3z",
                fill: "currentColor",
                stroke: "none"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/icons.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/icons.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
_c8 = YouTubeIcon;
function InstagramIcon() {
    let { className, size = 24 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SocialSvg, {
        className: className,
        size: size,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "2",
                y: "2",
                width: "20",
                height: "20",
                rx: "5",
                ry: "5",
                ...socialStroke
            }, void 0, false, {
                fileName: "[project]/src/components/ui/icons.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "4",
                ...socialStroke
            }, void 0, false, {
                fileName: "[project]/src/components/ui/icons.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "17.5",
                cy: "6.5",
                r: "0.9",
                fill: "currentColor",
                stroke: "none"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/icons.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/icons.tsx",
        lineNumber: 163,
        columnNumber: 5
    }, this);
}
_c9 = InstagramIcon;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "MortarboardIcon");
__turbopack_context__.k.register(_c1, "ArrowRightIcon");
__turbopack_context__.k.register(_c2, "ChevronLeftIcon");
__turbopack_context__.k.register(_c3, "PdfFileIcon");
__turbopack_context__.k.register(_c4, "ChevronRightIcon");
__turbopack_context__.k.register(_c5, "SocialSvg");
__turbopack_context__.k.register(_c6, "FacebookIcon");
__turbopack_context__.k.register(_c7, "LinkedInIcon");
__turbopack_context__.k.register(_c8, "YouTubeIcon");
__turbopack_context__.k.register(_c9, "InstagramIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/about-routes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Routes that belong under the About the Institution section (nav highlight + submenu). */ __turbopack_context__.s([
    "ABOUT_US_PAGE_PATHS",
    ()=>ABOUT_US_PAGE_PATHS,
    "isAboutUsPath",
    ()=>isAboutUsPath
]);
const ABOUT_US_PAGE_PATHS = [
    "/about-bihe",
    "/memorandum-of-association",
    "/institutional-development-plan",
    "/constituent-units",
    "/recognition",
    "/annual-reports",
    "/audit-report"
];
function isAboutUsPath(pathname) {
    return ABOUT_US_PAGE_PATHS.some((route)=>pathname === route || pathname.startsWith("".concat(route, "/")));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/academics-submenu.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACADEMICS_SUBMENU",
    ()=>ACADEMICS_SUBMENU
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$faculty$2d$pages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/faculty-pages.ts [app-client] (ecmascript)");
;
const ACADEMICS_FACULTY_MENU_ORDER = [
    "bca-faculty",
    "b-com-faculty",
    "non-teaching-staff"
];
const ACADEMICS_FACULTY_MENU_DESCRIPTIONS = {
    "bca-faculty": "Faculty profiles supporting the Bachelor of Computer Applications programme.",
    "b-com-faculty": "Faculty profiles and academic leadership for the Bachelor of Commerce programme.",
    "non-teaching-staff": "Administrative and support staff serving students and academic departments."
};
function facultySubmenuItems() {
    return ACADEMICS_FACULTY_MENU_ORDER.map((slug)=>({
            label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$faculty$2d$pages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FACULTY_PAGES"][slug].title,
            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$faculty$2d$pages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FACULTY_PAGES"][slug].href,
            slug,
            description: ACADEMICS_FACULTY_MENU_DESCRIPTIONS[slug]
        }));
}
const ACADEMICS_SUBMENU = [
    {
        label: "BCA",
        href: "/academics/bca",
        slug: "bca",
        description: "Bachelor of Computer Applications programme — curriculum, labs, and career pathways."
    },
    {
        label: "B.com",
        href: "/academics/b-com",
        slug: "b-com",
        description: "Bachelor of Commerce programme — curriculum, outcomes, and academic structure at BIHE."
    },
    {
        label: "Academic Calendar",
        href: "/academics/academic-calendar",
        slug: "academic-calendar",
        description: "Semester schedules, examination timelines, and key academic dates."
    },
    {
        label: "Academic & Examination Statutes",
        href: "/academics/academics-and-examination",
        slug: "academics-and-examination",
        description: "Examination policies, evaluation procedures, and academic regulations."
    },
    ...facultySubmenuItems(),
    {
        label: "Internal Quality Assurance Cell (IQAC)",
        href: "/academics/iqac",
        slug: "iqac",
        description: "IQAC initiatives, quality benchmarks, and institutional best practices."
    },
    {
        label: "Library",
        href: "/academics/library",
        slug: "library",
        description: "Library resources, digital access, and study support for students."
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/academics-routes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACADEMICS_BASE_PATH",
    ()=>ACADEMICS_BASE_PATH,
    "ACADEMICS_PAGE_PATHS",
    ()=>ACADEMICS_PAGE_PATHS,
    "isAcademicsPath",
    ()=>isAcademicsPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$academics$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/academics-submenu.ts [app-client] (ecmascript)");
;
const ACADEMICS_PAGE_PATHS = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$academics$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACADEMICS_SUBMENU"].map((item)=>item.href),
    "/academics/faculty-and-staff"
];
const ACADEMICS_BASE_PATH = "/academics/bca";
function isAcademicsPath(pathname) {
    return ACADEMICS_PAGE_PATHS.some((route)=>pathname === route || pathname.startsWith("".concat(route, "/")));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/admissions-page-nav.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ADMISSIONS_PAGE_NAV",
    ()=>ADMISSIONS_PAGE_NAV,
    "isAdmissionsPageNavActive",
    ()=>isAdmissionsPageNavActive
]);
const ADMISSIONS_PAGE_NAV = [
    {
        id: "admissions-and-fee",
        label: "Admissions and Fee",
        href: "/admissions/admission-process",
        matchPaths: [
            "/admissions/admission-process",
            "/admissions/fee-refund-policy"
        ]
    },
    {
        id: "online-admission-format",
        label: "Online Admission Format",
        href: "/admissions/online-admission-format",
        matchPaths: [
            "/admissions/online-admission-format"
        ]
    }
];
function isAdmissionsPageNavActive(pathname, item) {
    return item.matchPaths.some((path)=>pathname === path || pathname.startsWith("".concat(path, "/")));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/admissions-submenu.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ADMISSIONS_SUBMENU",
    ()=>ADMISSIONS_SUBMENU
]);
const ADMISSIONS_SUBMENU = [
    {
        label: "Admission Process & Guidelines",
        href: "/admissions/admission-process",
        slug: "admission-process",
        description: "Step-by-step admission procedure, required documents, and enrollment information for BIHE programmes."
    },
    {
        label: "Online Admission Format",
        href: "/admissions/online-admission-format",
        slug: "online-admission-format",
        description: "Online application format, submission guidelines, and required details for admission applicants."
    },
    {
        label: "Fee Refund Policy",
        href: "/admissions/fee-refund-policy",
        slug: "fee-refund-policy",
        description: "Guidelines for fee refunds, withdrawal timelines, and applicable conditions for admitted students."
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/admissions-routes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ADMISSIONS_BASE_PATH",
    ()=>ADMISSIONS_BASE_PATH,
    "ADMISSIONS_PAGE_PATHS",
    ()=>ADMISSIONS_PAGE_PATHS,
    "isAdmissionsPath",
    ()=>isAdmissionsPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admissions$2d$page$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admissions-page-nav.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admissions$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admissions-submenu.ts [app-client] (ecmascript)");
;
;
const ADMISSIONS_PAGE_PATHS = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admissions$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ADMISSIONS_SUBMENU"].map((item)=>item.href),
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admissions$2d$page$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ADMISSIONS_PAGE_NAV"].map((item)=>item.href)
];
const ADMISSIONS_BASE_PATH = "/admissions/admission-process";
function isAdmissionsPath(pathname) {
    return ADMISSIONS_PAGE_PATHS.some((route)=>pathname === route || pathname.startsWith("".concat(route, "/")));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/research-submenu.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RESEARCH_SUBMENU",
    ()=>RESEARCH_SUBMENU
]);
const RESEARCH_SUBMENU = [
    {
        label: "Research & Development Cell",
        href: "/research/research-and-development-cell",
        slug: "research-and-development-cell",
        description: "Institutional R&D initiatives, funding guidance, and research coordination across departments."
    },
    {
        label: "Academic Projects",
        href: "/research/academic-projects",
        slug: "academic-projects",
        description: "Undergraduate and faculty-led academic projects, publications, and project-based learning."
    },
    {
        label: "Incubation Centre",
        href: "/research/incubation-centre",
        slug: "incubation-centre",
        description: "Startup incubation, mentorship, and innovation support for student and faculty entrepreneurs."
    },
    {
        label: "Central Research Facilities",
        href: "/research/central-research-facilities",
        slug: "central-research-facilities",
        description: "Shared laboratories, equipment, and infrastructure for interdisciplinary research at BIHE."
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/research-routes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RESEARCH_BASE_PATH",
    ()=>RESEARCH_BASE_PATH,
    "RESEARCH_PAGE_PATHS",
    ()=>RESEARCH_PAGE_PATHS,
    "isResearchPath",
    ()=>isResearchPath,
    "rdcProjectPath",
    ()=>rdcProjectPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/research-submenu.ts [app-client] (ecmascript)");
;
const RESEARCH_PAGE_PATHS = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RESEARCH_SUBMENU"].map(_c = (item)=>item.href);
_c1 = RESEARCH_PAGE_PATHS;
const RESEARCH_BASE_PATH = "/research/research-and-development-cell";
function rdcProjectPath(projectSlug) {
    return "".concat(RESEARCH_BASE_PATH, "/").concat(projectSlug);
}
function isResearchPath(pathname) {
    return RESEARCH_PAGE_PATHS.some((route)=>pathname === route || pathname.startsWith("".concat(route, "/")));
}
var _c, _c1;
__turbopack_context__.k.register(_c, "RESEARCH_PAGE_PATHS$RESEARCH_SUBMENU.map");
__turbopack_context__.k.register(_c1, "RESEARCH_PAGE_PATHS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/info-corner-nav.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INFO_CORNER_DEDICATED_NAV",
    ()=>INFO_CORNER_DEDICATED_NAV,
    "buildInfoCornerNavLinks",
    ()=>buildInfoCornerNavLinks,
    "buildInfoCornerSidebarLinks",
    ()=>buildInfoCornerSidebarLinks
]);
const INFO_CORNER_DEDICATED_NAV = [
    {
        slug: "rti-details",
        name: "RTI Details",
        href: "/info-corner/rti-details",
        description: "Right to Information Act details, public information officers, and disclosure procedures at BIHE."
    },
    {
        slug: "international-students-admission",
        name: "Admission procedure and facilities provided to International Students.",
        href: "/info-corner/international-students-admission",
        description: "Admission guidelines, eligibility, and campus facilities available for international students at BIHE."
    }
];
function buildInfoCornerNavLinks(categories) {
    return categories.map((category)=>{
        var _category_description;
        return {
            slug: category.slug,
            name: category.name,
            href: category.href,
            description: (_category_description = category.description) !== null && _category_description !== void 0 ? _category_description : undefined
        };
    });
}
function buildInfoCornerSidebarLinks(categories) {
    return [
        ...INFO_CORNER_DEDICATED_NAV,
        ...buildInfoCornerNavLinks(categories)
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/info-corner-submenu.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INFO_CORNER_SUBMENU",
    ()=>INFO_CORNER_SUBMENU
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$info$2d$corner$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/info-corner-nav.ts [app-client] (ecmascript)");
;
const INFO_CORNER_CATEGORY_SUBMENU = [
    {
        label: "Announcements",
        href: "/info-corner/announcements",
        slug: "announcements",
        description: "Official college announcements, notices, and updates for students, faculty, and stakeholders."
    },
    {
        label: "Newsletters",
        href: "/info-corner/newsletters",
        slug: "newsletters",
        description: "Institutional newsletters highlighting campus news, academic updates, and community activities."
    },
    {
        label: "News, Events & Achievements",
        href: "/info-corner/news-events-achievements",
        slug: "news-events-achievements",
        description: "Latest news, campus events, student achievements, and institutional milestones at BIHE."
    },
    {
        label: "Circulars and Notices",
        href: "/info-corner/circulars-and-notices",
        slug: "circulars-and-notices",
        description: "Official circulars, administrative notices, and compliance-related communications from the institution."
    },
    {
        label: "Job Openings",
        href: "/info-corner/job-openings",
        slug: "job-openings",
        description: "Current faculty and staff recruitment opportunities at Bapuji Institute of Hi-Tech Education."
    }
];
function dedicatedToSubmenu(entry) {
    var _entry_description;
    return {
        label: entry.name,
        href: entry.href,
        slug: entry.slug,
        description: (_entry_description = entry.description) !== null && _entry_description !== void 0 ? _entry_description : ""
    };
}
const INFO_CORNER_SUBMENU = [
    dedicatedToSubmenu(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$info$2d$corner$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INFO_CORNER_DEDICATED_NAV"][0]),
    ...INFO_CORNER_CATEGORY_SUBMENU,
    dedicatedToSubmenu(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$info$2d$corner$2d$nav$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INFO_CORNER_DEDICATED_NAV"][1])
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/info-corner-routes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INFO_CORNER_BASE_PATH",
    ()=>INFO_CORNER_BASE_PATH,
    "INFO_CORNER_PAGE_PATHS",
    ()=>INFO_CORNER_PAGE_PATHS,
    "isInfoCornerPath",
    ()=>isInfoCornerPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$info$2d$corner$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/info-corner-submenu.ts [app-client] (ecmascript)");
;
const INFO_CORNER_PAGE_PATHS = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$info$2d$corner$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INFO_CORNER_SUBMENU"].map(_c = (item)=>item.href);
_c1 = INFO_CORNER_PAGE_PATHS;
const INFO_CORNER_BASE_PATH = "/info-corner/rti-details";
function isInfoCornerPath(pathname) {
    return INFO_CORNER_PAGE_PATHS.some((route)=>pathname === route || pathname.startsWith("".concat(route, "/")));
}
var _c, _c1;
__turbopack_context__.k.register(_c, "INFO_CORNER_PAGE_PATHS$INFO_CORNER_SUBMENU.map");
__turbopack_context__.k.register(_c1, "INFO_CORNER_PAGE_PATHS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/student-life-submenu.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STUDENT_LIFE_SUBMENU",
    ()=>STUDENT_LIFE_SUBMENU
]);
const STUDENT_LIFE_SUBMENU = [
    {
        label: "Sports Facilities",
        href: "/student-life/sports-facilities",
        slug: "sports-facilities",
        description: "Outdoor grounds, indoor games, and fitness activities that encourage teamwork and student wellness."
    },
    {
        label: "NSS Details",
        href: "/student-life/nss-details",
        slug: "nss-details",
        description: "National Service Scheme programmes, community outreach, and social responsibility initiatives at BIHE."
    },
    {
        label: "Hostel Facilities",
        href: "/student-life/hostel-facilities",
        slug: "hostel-facilities",
        description: "Safe and comfortable on-campus accommodation for boys and girls with essential amenities."
    },
    {
        label: "Placement Cell & Activities",
        href: "/student-life/placement-cell-and-activities",
        slug: "placement-cell-and-activities",
        description: "Training, internships, campus recruitment, and career development support for students."
    },
    {
        label: "Student Grievance Redressal Committee (SGRC)",
        href: "/student-life/student-grievance-redressal-committee",
        slug: "student-grievance-redressal-committee",
        description: "Fair and transparent grievance redressal for students in accordance with institutional policies."
    },
    {
        label: "Health Facilities",
        href: "/student-life/health-facilities",
        slug: "health-facilities",
        description: "First-aid support, health awareness programmes, and referral assistance for students on campus."
    },
    {
        label: "Internal Complaint Committee",
        href: "/internal-complaint-committee",
        slug: "internal-complaint-committee",
        description: "Internal complaints committee and campus safety compliance as per institutional guidelines."
    },
    {
        label: "Anti-Ragging Cell",
        href: "/student-life/anti-ragging-cell",
        slug: "anti-ragging-cell",
        description: "Zero-tolerance anti-ragging measures, awareness programmes, and student protection on campus."
    },
    {
        label: "Equal Opportunity Cell",
        href: "/student-life/equal-opportunity-cell",
        slug: "equal-opportunity-cell",
        description: "Promoting equity, inclusion, and equal access to academic and campus opportunities."
    },
    {
        label: "Socio-Economically Disadvantaged Groups (SEDG) Cell",
        href: "/student-life/socio-economically-disadvantaged-groups",
        slug: "socio-economically-disadvantaged-groups",
        description: "Support schemes and welfare measures for students from socio-economically disadvantaged backgrounds."
    },
    {
        label: "Facilities for Differently-Abled Students",
        href: "/student-life/facilities-for-differently-abled-students",
        slug: "facilities-for-differently-abled-students",
        description: "Accessible infrastructure and assistance for differently-abled students at BIHE."
    },
    {
        label: "Computer Lab",
        href: "/student-life/computer-lab",
        slug: "computer-lab",
        description: "Modern computer laboratories with updated systems for practical learning and projects."
    },
    {
        label: "Auditorium",
        href: "/student-life/auditorium",
        slug: "auditorium",
        description: "Spacious auditorium for seminars, cultural programmes, and institutional events."
    },
    {
        label: "Canteen",
        href: "/student-life/canteen",
        slug: "canteen",
        description: "Hygienic canteen facilities offering affordable meals for students and staff."
    },
    {
        label: "Youth Red Cross",
        href: "/student-life/youth-red-cross",
        slug: "youth-red-cross",
        description: "Youth Red Cross activities promoting health, humanitarian service, and community care."
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/student-life-routes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STUDENT_LIFE_BASE_PATH",
    ()=>STUDENT_LIFE_BASE_PATH,
    "STUDENT_LIFE_PAGE_PATHS",
    ()=>STUDENT_LIFE_PAGE_PATHS,
    "isStudentLifePath",
    ()=>isStudentLifePath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$student$2d$life$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/student-life-submenu.ts [app-client] (ecmascript)");
;
const STUDENT_LIFE_PAGE_PATHS = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$student$2d$life$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STUDENT_LIFE_SUBMENU"].map(_c = (item)=>item.href);
_c1 = STUDENT_LIFE_PAGE_PATHS;
const STUDENT_LIFE_BASE_PATH = "/student-life/sports-facilities";
function isStudentLifePath(pathname) {
    return STUDENT_LIFE_PAGE_PATHS.some((route)=>pathname === route || pathname.startsWith("".concat(route, "/")));
}
var _c, _c1;
__turbopack_context__.k.register(_c, "STUDENT_LIFE_PAGE_PATHS$STUDENT_LIFE_SUBMENU.map");
__turbopack_context__.k.register(_c1, "STUDENT_LIFE_PAGE_PATHS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/administration-submenu.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ADMINISTRATION_SUBMENU",
    ()=>ADMINISTRATION_SUBMENU
]);
const ADMINISTRATION_SUBMENU = [
    {
        label: "Governing Bodies",
        href: "/governing-bodies",
        description: "Governance structure, committees, and institutional oversight."
    },
    {
        label: "Principal",
        href: "/principal",
        description: "Leadership, academic vision, and institutional administration at BIHE."
    },
    {
        label: "Controller of Examinations",
        href: "/controller-of-examination",
        description: "Examination schedules, evaluation processes, and academic records."
    },
    {
        label: "Ombudsperson",
        href: "/ombudsperson",
        description: "Independent grievance redressal and stakeholder support."
    },
    {
        label: "Finance Officer",
        href: "/finance-section",
        description: "Financial planning, fee administration, and institutional accounts."
    },
    {
        label: "Internal Complaint Committee",
        href: "/internal-complaint-committee",
        description: "Internal complaints committee and campus safety compliance."
    },
    {
        label: "Academic Leadership of BCA",
        href: "/bca",
        description: "Academic leadership, coordination, and department information for BCA."
    },
    {
        label: "Academic Leadership of B.com",
        href: "/b-com",
        description: "Academic leadership, coordination, and department information for B.Com."
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/administration-routes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ADMINISTRATION_PAGE_PATHS",
    ()=>ADMINISTRATION_PAGE_PATHS,
    "isAdministrationPath",
    ()=>isAdministrationPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$administration$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/administration-submenu.ts [app-client] (ecmascript)");
;
const ADMINISTRATION_PAGE_PATHS = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$administration$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ADMINISTRATION_SUBMENU"].map(_c = (item)=>item.href);
_c1 = ADMINISTRATION_PAGE_PATHS;
function isAdministrationPath(pathname) {
    return ADMINISTRATION_PAGE_PATHS.some((route)=>pathname === route || pathname.startsWith("".concat(route, "/")));
}
var _c, _c1;
__turbopack_context__.k.register(_c, "ADMINISTRATION_PAGE_PATHS$ADMINISTRATION_SUBMENU.map");
__turbopack_context__.k.register(_c1, "ADMINISTRATION_PAGE_PATHS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/alumni-routes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAlumniPath",
    ()=>isAlumniPath,
    "isAlumniReservedSlug",
    ()=>isAlumniReservedSlug
]);
const ALUMNI_RESERVED_SLUGS = new Set([
    "events",
    "register",
    "home",
    "about",
    "gallery"
]);
function isAlumniReservedSlug(slug) {
    return ALUMNI_RESERVED_SLUGS.has(slug);
}
function isAlumniPath(pathname) {
    const path = pathname.replace(/\/$/, "") || "/";
    return path === "/alumni" || path.startsWith("/alumni/");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/site-links.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Canonical routes and home-page section anchors (work from any page). */ __turbopack_context__.s([
    "SITE_LINKS",
    ()=>SITE_LINKS,
    "galleryAlbumHref",
    ()=>galleryAlbumHref,
    "isPlaceholderGallerySlug",
    ()=>isPlaceholderGallerySlug,
    "isPlaceholderNewsSlug",
    ()=>isPlaceholderNewsSlug,
    "newsItemHref",
    ()=>newsItemHref
]);
const SITE_LINKS = {
    home: "/",
    aboutBihe: "/about-bihe",
    memorandum: "/memorandum-of-association",
    idp: "/institutional-development-plan",
    constituentUnits: "/constituent-units",
    recognition: "/recognition",
    annualReports: "/annual-reports",
    auditReport: "/audit-report",
    principal: "/principal",
    financeSection: "/finance-section",
    controllerOfExamination: "/controller-of-examination",
    ombudsperson: "/ombudsperson",
    governingBodies: "/governing-bodies",
    internalComplaintCommittee: "/internal-complaint-committee",
    bcaAdministration: "/bca",
    bComAdministration: "/b-com",
    academicsBca: "/academics/bca",
    academicsBCom: "/academics/b-com",
    academicCalendar: "/academics/academic-calendar",
    academicsAndExamination: "/academics/academics-and-examination",
    facultyAndStaff: "/academics/faculty-and-staff",
    academicsBComFaculty: "/academics/b-com-faculty",
    academicsBcaFaculty: "/academics/bca-faculty",
    academicsNonTeachingStaff: "/academics/non-teaching-staff",
    iqac: "/academics/iqac",
    academicsLibrary: "/academics/library",
    admissionsAdmissionProcess: "/admissions/admission-process",
    admissionsFeeRefundPolicy: "/admissions/fee-refund-policy",
    admissionsOnlineAdmissionFormat: "/admissions/online-admission-format",
    researchIncubationCentre: "/research/incubation-centre",
    researchCentralFacilities: "/research/central-research-facilities",
    researchDevelopmentCell: "/research/research-and-development-cell",
    researchDevelopmentCellProject: (slug)=>"/research/research-and-development-cell/".concat(slug),
    researchAcademicProjects: "/research/academic-projects",
    studentLifeSportsFacilities: "/student-life/sports-facilities",
    studentLifeSportsFacilitiesEvents: "/student-life/sports-facilities/events",
    studentLifeNssDetails: "/student-life/nss-details",
    studentLifeHostelFacilities: "/student-life/hostel-facilities",
    studentLifePlacementCell: "/student-life/placement-cell-and-activities",
    studentLifeMegaPlacementDrive2025: "/student-life/placement-cell-and-activities/mega-placement-drive-2025",
    studentLifeGrievanceRedressal: "/student-life/student-grievance-redressal-committee",
    studentLifeHealthFacilities: "/student-life/health-facilities",
    studentLifeAntiRaggingCell: "/student-life/anti-ragging-cell",
    studentLifeEqualOpportunityCell: "/student-life/equal-opportunity-cell",
    studentLifeSocioEconomicallyDisadvantaged: "/student-life/socio-economically-disadvantaged-groups",
    studentLifeDifferentlyAbledFacilities: "/student-life/facilities-for-differently-abled-students",
    studentLifeComputerLab: "/student-life/computer-lab",
    studentLifeAuditorium: "/student-life/auditorium",
    studentLifeCanteen: "/student-life/canteen",
    studentLifeYouthRedCross: "/student-life/youth-red-cross",
    courses: "/#courses",
    facilities: "/#facilities",
    accreditation: "/#accreditation",
    announcement: "/info-corner/announcements",
    infoCornerRtiDetails: "/info-corner/rti-details",
    infoCornerAnnouncements: "/info-corner/announcements",
    infoCornerNewsletters: "/info-corner/newsletters",
    infoCornerNewsEventsAchievements: "/info-corner/news-events-achievements",
    infoCornerInternationalStudentsAdmission: "/info-corner/international-students-admission",
    infoCornerCircularsAndNotices: "/info-corner/circulars-and-notices",
    infoCornerCircularNotice: (id)=>"/info-corner/circulars-and-notices/".concat(id),
    infoCornerJobOpenings: "/info-corner/job-openings",
    events: "/news",
    news: "/news",
    newsDetail: (slug)=>"/news/".concat(slug),
    gallery: "/gallery",
    galleryAlbum: (slug)=>"/gallery/".concat(slug),
    galleryPhoto: (slug)=>"/gallery/".concat(slug),
    gallerySection: "/#gallery",
    contact: "/contact",
    alumni: "/alumni",
    alumniHome: "/alumni/home",
    alumniAbout: "/alumni/about",
    alumniGallery: "/alumni/gallery",
    alumniGalleryPhoto: (imageId)=>"/alumni/gallery/".concat(imageId),
    alumniEvents: "/alumni/events",
    alumniRegister: "/alumni/register",
    contactSection: "/#contact",
    apply: "/contact",
    external: {
        website: "https://bihedvg.org/",
        email: "mailto:principal@bihedvg.org",
        phone: "tel:08192221625"
    }
};
function isPlaceholderNewsSlug(slug) {
    return !slug || slug.startsWith("fallback-");
}
function newsItemHref(slug) {
    return isPlaceholderNewsSlug(slug) ? SITE_LINKS.news : SITE_LINKS.newsDetail(slug);
}
function isPlaceholderGallerySlug(slug) {
    return !slug || slug.startsWith("fallback-") || /^\d+$/.test(slug);
}
function galleryAlbumHref(slug) {
    return isPlaceholderGallerySlug(slug) ? SITE_LINKS.gallery : SITE_LINKS.galleryAlbum(slug);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/alumni-submenu.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALUMNI_SUBMENU",
    ()=>ALUMNI_SUBMENU
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site-links.ts [app-client] (ecmascript)");
;
const ALUMNI_SUBMENU = [
    {
        label: "Alumni Home",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].alumniHome
    },
    {
        label: "About Alumni Association",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].alumniAbout
    },
    {
        label: "Alumni Gallery",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].alumniGallery
    },
    {
        label: "Alumni Directory",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].alumni
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/about-submenu.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ABOUT_SUBMENU",
    ()=>ABOUT_SUBMENU
]);
const ABOUT_SUBMENU = [
    {
        label: "About BIHE",
        href: "/about-bihe",
        description: "Overview of Bapuji Institute of Hi-Tech Education — our mission, campus, and academic community in Davangere."
    },
    {
        label: "Memorandum of Association",
        href: "/memorandum-of-association",
        description: "Governance framework and constitutional documents that guide the institute's operations and accountability."
    },
    {
        label: "Institutional Development Plan",
        href: "/institutional-development-plan",
        description: "Strategic roadmap for academic growth, infrastructure, and quality enhancement across programs."
    },
    {
        label: "Affliation",
        href: "/constituent-units",
        description: "Affiliation and university recognition documents for BIHE constituent programmes."
    },
    {
        label: "Recognition",
        href: "/recognition",
        description: "AICTE approval, university affiliation, and accreditation milestones that validate program quality."
    },
    {
        label: "Annual Reports",
        href: "/annual-reports",
        description: "Year-wise institutional reports covering academics, administration, and key performance highlights."
    },
    {
        label: "Audit Report",
        href: "/audit-report",
        description: "Financial and compliance audit disclosures published for transparency and stakeholder review."
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/footer-content.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FOOTER_ADMISSIONS_LINKS",
    ()=>FOOTER_ADMISSIONS_LINKS,
    "FOOTER_CONTACT",
    ()=>FOOTER_CONTACT,
    "FOOTER_COPYRIGHT",
    ()=>FOOTER_COPYRIGHT,
    "FOOTER_DESCRIPTION",
    ()=>FOOTER_DESCRIPTION,
    "FOOTER_GALLERY_LINKS",
    ()=>FOOTER_GALLERY_LINKS,
    "FOOTER_INSTITUTE_NAME_EN",
    ()=>FOOTER_INSTITUTE_NAME_EN,
    "FOOTER_INSTITUTE_NAME_KN",
    ()=>FOOTER_INSTITUTE_NAME_KN,
    "FOOTER_LINK_COLUMNS",
    ()=>FOOTER_LINK_COLUMNS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site-links.ts [app-client] (ecmascript)");
;
const FOOTER_INSTITUTE_NAME_KN = "ಬಾಪೂಜಿ ಇನ್ಸ್ಟಿಟ್ಯೂಟ್ ಆಫ್ ಹೈಟೆಕ್ ಎಜುಕೇಶನ್";
const FOOTER_INSTITUTE_NAME_EN = "Bapuji Institute of High-Tech Education";
const FOOTER_DESCRIPTION = "Bapuji Institute of Hi-Tech Education imparts advanced curriculum course on Bachelor of Computer Application (BCA) & Bachelor of Commerce (B.Com).";
const FOOTER_GALLERY_LINKS = [
    {
        label: "Image Gallery",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].gallery
    },
    {
        label: "Prospectus",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].admissionsAdmissionProcess
    },
    {
        label: "Video Gallery",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].gallerySection
    }
];
const FOOTER_ADMISSIONS_LINKS = [
    {
        label: "Admission Process & Guidelines",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].admissionsAdmissionProcess
    },
    {
        label: "Fee Refund Policy",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].admissionsFeeRefundPolicy
    },
    {
        label: "Application",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].admissionsOnlineAdmissionFormat
    }
];
const FOOTER_CONTACT = {
    phone: "08192-221625",
    phoneHref: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].external.phone,
    email: "principal@bihedvg.org",
    emailHref: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].external.email
};
const FOOTER_LINK_COLUMNS = [
    {
        title: "Admissions",
        links: FOOTER_ADMISSIONS_LINKS
    },
    {
        title: "Gallery",
        links: FOOTER_GALLERY_LINKS
    },
    {
        title: "Campus Life",
        links: [
            {
                label: "Sports",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].studentLifeSportsFacilities
            },
            {
                label: "Hostel",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].studentLifeHostelFacilities
            },
            {
                label: "Placement Cell",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].studentLifePlacementCell
            },
            {
                label: "Anti-Ragging Cell",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].studentLifeAntiRaggingCell
            },
            {
                label: "Computer Lab",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].studentLifeComputerLab
            },
            {
                label: "Auditorium",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].studentLifeAuditorium
            },
            {
                label: "Canteen",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].studentLifeCanteen
            }
        ]
    },
    {
        title: "About the Institution",
        links: [
            {
                label: "About BEA",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].governingBodies
            },
            {
                label: "About BIHE",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].aboutBihe
            },
            {
                label: "Hon. Secretary",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].governingBodies
            },
            {
                label: "Hon. Joint Secretary",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].governingBodies
            },
            {
                label: "Chairman",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].governingBodies
            },
            {
                label: "Principal",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].principal
            }
        ]
    },
    {
        title: "Academics",
        links: [
            {
                label: "Programs Offered",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].courses
            },
            {
                label: "Academic Calendar",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].academicCalendar
            },
            {
                label: "B.Com Faculty",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].academicsBComFaculty
            },
            {
                label: "BCA Faculty",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].academicsBcaFaculty
            },
            {
                label: "Non - Teaching Staff",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].academicsNonTeachingStaff
            },
            {
                label: "Library",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].academicsLibrary
            },
            {
                label: "Internal Quality Assurance Cell (IQAC)",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].iqac
            }
        ]
    },
    {
        title: "Information Corner",
        links: [
            {
                label: "RTI Details",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].infoCornerRtiDetails
            },
            {
                label: "Circulars & Notices",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].infoCornerCircularsAndNotices
            },
            {
                label: "Announcements",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].infoCornerAnnouncements
            },
            {
                label: "Newsletters",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].infoCornerNewsletters
            },
            {
                label: "News, Events & Achievements",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].infoCornerNewsEventsAchievements
            },
            {
                label: "Careers",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].infoCornerJobOpenings
            }
        ]
    }
];
const FOOTER_COPYRIGHT = "Website Copyright @ BIHE";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/static-navigation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STATIC_FOOTER_NAV",
    ()=>STATIC_FOOTER_NAV,
    "STATIC_HEADER_NAV",
    ()=>STATIC_HEADER_NAV
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$about$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/about-submenu.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$administration$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/administration-submenu.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$academics$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/academics-submenu.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admissions$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admissions-submenu.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/research-submenu.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$student$2d$life$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/student-life-submenu.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$info$2d$corner$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/info-corner-submenu.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$footer$2d$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/footer-content.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site-links.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
const STATIC_HEADER_NAV = [
    {
        label: "Home",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].home
    },
    {
        label: "About the Institution",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].aboutBihe,
        dropdown: true,
        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$about$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ABOUT_SUBMENU"].map((param)=>{
            let { label, href } = param;
            return {
                label,
                href
            };
        })
    },
    {
        label: "Administration",
        href: "/governing-bodies",
        dropdown: true,
        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$administration$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ADMINISTRATION_SUBMENU"].map((param)=>{
            let { label, href } = param;
            return {
                label,
                href
            };
        })
    },
    {
        label: "Academics",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].academicsBca,
        dropdown: true,
        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$academics$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACADEMICS_SUBMENU"].map((param)=>{
            let { label, href } = param;
            return {
                label,
                href
            };
        })
    },
    {
        label: "Admissions & Fee",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].admissionsAdmissionProcess,
        dropdown: true,
        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admissions$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ADMISSIONS_SUBMENU"].map((param)=>{
            let { label, href } = param;
            return {
                label,
                href
            };
        })
    },
    {
        label: "Research",
        href: "/research/research-and-development-cell",
        dropdown: true,
        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RESEARCH_SUBMENU"].map((param)=>{
            let { label, href } = param;
            return {
                label,
                href
            };
        })
    },
    {
        label: "Student Life",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].studentLifeSportsFacilities,
        dropdown: true,
        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$student$2d$life$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STUDENT_LIFE_SUBMENU"].map((param)=>{
            let { label, href } = param;
            return {
                label,
                href
            };
        })
    },
    {
        label: "Info - Corner",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].infoCornerRtiDetails,
        dropdown: true,
        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$info$2d$corner$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INFO_CORNER_SUBMENU"].map((param)=>{
            let { label, href } = param;
            return {
                label,
                href
            };
        })
    },
    {
        label: "Contact Us",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].contact
    }
];
const STATIC_FOOTER_NAV = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$footer$2d$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FOOTER_LINK_COLUMNS"].map(_c = (column)=>({
        title: column.title,
        links: column.links
    }));
_c1 = STATIC_FOOTER_NAV;
var _c, _c1;
__turbopack_context__.k.register(_c, "STATIC_FOOTER_NAV$FOOTER_LINK_COLUMNS.map");
__turbopack_context__.k.register(_c1, "STATIC_FOOTER_NAV");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/landing/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SmartImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/SmartImage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/icons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$about$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/about-routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$academics$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/academics-routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admissions$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admissions-routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/research-routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$info$2d$corner$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/info-corner-routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$student$2d$life$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/student-life-routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$administration$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/administration-routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$images$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/images.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$alumni$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/alumni-routes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$alumni$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/alumni-submenu.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site-links.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$static$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/static-navigation.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const ALUMNI_TOPBAR_ITEM = {
    label: "Alumni",
    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].alumniHome,
    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$alumni$2d$submenu$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALUMNI_SUBMENU"]
};
function IconChevron() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "bihe-site-header__chevron",
        width: "10",
        height: "10",
        viewBox: "0 0 10 10",
        fill: "none",
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M2 3L5 6L8 3",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round"
        }, void 0, false, {
            fileName: "[project]/src/components/landing/Header.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/landing/Header.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c = IconChevron;
function SocialIcon(param) {
    let { children, label, href = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].external.website } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: href,
        className: "bihe-site-header__social-btn",
        "aria-label": label,
        target: "_blank",
        rel: "noopener noreferrer",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/landing/Header.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_c1 = SocialIcon;
function submenuHrefPath(href) {
    const hashIndex = href.indexOf("#");
    return hashIndex === -1 ? href : href.slice(0, hashIndex);
}
function pathMatchesSubmenuLink(pathname, href) {
    const path = submenuHrefPath(href);
    if (!path) return false;
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith("".concat(path, "/"));
}
function isSubmenuLinkActive(pathname, href, siblings) {
    const path = submenuHrefPath(href);
    if (!pathMatchesSubmenuLink(pathname, path)) return false;
    const bestMatch = siblings.map((child)=>submenuHrefPath(child.href)).filter((candidate)=>pathMatchesSubmenuLink(pathname, candidate)).sort((a, b)=>b.length - a.length)[0];
    return bestMatch === path;
}
function isGalleryPath(pathname) {
    return pathname === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].gallery || pathname.startsWith("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].gallery, "/"));
}
function isNavItemActive(pathname, item) {
    if (item.label === "Home") return pathname === "/";
    if (item.label === "About the Institution") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$about$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAboutUsPath"])(pathname);
    if (item.label === "Administration") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$administration$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAdministrationPath"])(pathname);
    if (item.label === "Academics") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$academics$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAcademicsPath"])(pathname);
    if (item.label === "Admissions & Fee") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admissions$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAdmissionsPath"])(pathname);
    if (item.label === "Research") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$research$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isResearchPath"])(pathname);
    if (item.label === "Student Life") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$student$2d$life$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStudentLifePath"])(pathname);
    if (item.label === "Info - Corner") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$info$2d$corner$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInfoCornerPath"])(pathname);
    if (item.href.includes("#")) {
        // Section anchors (/#courses, /#contact, …) — highlight via scroll/hash later if needed
        return false;
    }
    const path = item.href;
    return pathname === path || path !== "/" && pathname.startsWith("".concat(path, "/"));
}
function getFixedContainingBlockOrigin(element) {
    let node = element.parentElement;
    while(node){
        const style = getComputedStyle(node);
        const createsContainingBlock = style.transform !== "none" || style.filter !== "none" || style.backdropFilter !== "none" || style.perspective !== "none";
        if (createsContainingBlock) {
            const rect = node.getBoundingClientRect();
            return {
                top: rect.top,
                left: rect.left
            };
        }
        node = node.parentElement;
    }
    return {
        top: 0,
        left: 0
    };
}
function Header() {
    let { navigation, prospectus } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _s();
    const navItems = navigation !== null && navigation !== void 0 ? navigation : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$static$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATIC_HEADER_NAV"];
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const headerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [openDropdown, setOpenDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const el = headerRef.current;
            if (!el) return;
            const syncHeaderHeight = {
                "Header.useEffect.syncHeaderHeight": ()=>{
                    const topbar = el.querySelector(".bihe-site-header__topbar");
                    const navbar = el.querySelector(".bihe-site-header__navbar");
                    if (!topbar || !navbar) return;
                    const height = topbar.getBoundingClientRect().height + navbar.getBoundingClientRect().height;
                    document.documentElement.style.setProperty("--site-header-height", "".concat(Math.round(height), "px"));
                }
            }["Header.useEffect.syncHeaderHeight"];
            syncHeaderHeight();
            const ro = new ResizeObserver(syncHeaderHeight);
            ro.observe(el);
            const topbar = el.querySelector(".bihe-site-header__topbar");
            const navbar = el.querySelector(".bihe-site-header__navbar");
            if (topbar) ro.observe(topbar);
            if (navbar) ro.observe(navbar);
            window.addEventListener("resize", syncHeaderHeight);
            return ({
                "Header.useEffect": ()=>{
                    ro.disconnect();
                    window.removeEventListener("resize", syncHeaderHeight);
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], [
        menuOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            let rafId = 0;
            const readScroll = {
                "Header.useEffect.readScroll": ()=>{
                    var _window___lenis;
                    var _window___lenis_scroll;
                    return (_window___lenis_scroll = (_window___lenis = window.__lenis) === null || _window___lenis === void 0 ? void 0 : _window___lenis.scroll) !== null && _window___lenis_scroll !== void 0 ? _window___lenis_scroll : window.scrollY;
                }
            }["Header.useEffect.readScroll"];
            const SCROLL_COMPACT_AT = 20;
            const SCROLL_EXPAND_AT = 6;
            const update = {
                "Header.useEffect.update": (scroll)=>{
                    setScrolled({
                        "Header.useEffect.update": (compact)=>{
                            if (!compact && scroll > SCROLL_COMPACT_AT) return true;
                            if (compact && scroll < SCROLL_EXPAND_AT) return false;
                            return compact;
                        }
                    }["Header.useEffect.update"]);
                }
            }["Header.useEffect.update"];
            const onScroll = {
                "Header.useEffect.onScroll": ()=>{
                    if (rafId) return;
                    rafId = requestAnimationFrame({
                        "Header.useEffect.onScroll": ()=>{
                            rafId = 0;
                            update(readScroll());
                        }
                    }["Header.useEffect.onScroll"]);
                }
            }["Header.useEffect.onScroll"];
            const onLenisScroll = {
                "Header.useEffect.onLenisScroll": (e)=>{
                    if (rafId) return;
                    rafId = requestAnimationFrame({
                        "Header.useEffect.onLenisScroll": ()=>{
                            rafId = 0;
                            update(e.scroll);
                        }
                    }["Header.useEffect.onLenisScroll"]);
                }
            }["Header.useEffect.onLenisScroll"];
            const bindLenis = {
                "Header.useEffect.bindLenis": ()=>{
                    const lenis = window.__lenis;
                    if (!lenis) return;
                    window.removeEventListener("scroll", onScroll);
                    update(lenis.scroll);
                    lenis.on("scroll", onLenisScroll);
                }
            }["Header.useEffect.bindLenis"];
            const unbindLenis = {
                "Header.useEffect.unbindLenis": ()=>{
                    var _window___lenis;
                    (_window___lenis = window.__lenis) === null || _window___lenis === void 0 ? void 0 : _window___lenis.off("scroll", onLenisScroll);
                    window.addEventListener("scroll", onScroll, {
                        passive: true
                    });
                }
            }["Header.useEffect.unbindLenis"];
            onScroll();
            window.addEventListener("lenis:ready", bindLenis);
            if (window.__lenis) {
                bindLenis();
            } else {
                window.addEventListener("scroll", onScroll, {
                    passive: true
                });
            }
            return ({
                "Header.useEffect": ()=>{
                    if (rafId) cancelAnimationFrame(rafId);
                    window.removeEventListener("scroll", onScroll);
                    window.removeEventListener("lenis:ready", bindLenis);
                    unbindLenis();
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const lenis = window.__lenis;
            if (menuOpen) {
                lenis === null || lenis === void 0 ? void 0 : lenis.stop();
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
                lenis === null || lenis === void 0 ? void 0 : lenis.start();
                setOpenDropdown(null);
            }
            return ({
                "Header.useEffect": ()=>{
                    document.body.style.overflow = "";
                    lenis === null || lenis === void 0 ? void 0 : lenis.start();
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], [
        menuOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const header = headerRef.current;
            if (!openDropdown || !header) return;
            const desktopMq = window.matchMedia("(min-width: 1201px)");
            const viewportMargin = 16;
            const syncSubmenuPosition = {
                "Header.useEffect.syncSubmenuPosition": ()=>{
                    const item = header.querySelector('[data-nav-dropdown="'.concat(CSS.escape(openDropdown), '"]'));
                    const submenu = item === null || item === void 0 ? void 0 : item.querySelector(".bihe-site-header__submenu");
                    if (!item || !submenu) return;
                    if (item.classList.contains("bihe-site-header__topbar-dropdown")) {
                        submenu.style.removeProperty("--submenu-top");
                        submenu.style.removeProperty("--submenu-left");
                        submenu.style.removeProperty("--submenu-right");
                        return;
                    }
                    if (!desktopMq.matches) {
                        submenu.style.removeProperty("--submenu-top");
                        submenu.style.removeProperty("--submenu-left");
                        submenu.style.removeProperty("--submenu-right");
                        return;
                    }
                    var _item_querySelector;
                    const trigger = (_item_querySelector = item.querySelector(".bihe-site-header__nav-link-group")) !== null && _item_querySelector !== void 0 ? _item_querySelector : item.querySelector(".bihe-site-header__nav-link");
                    const rect = (trigger !== null && trigger !== void 0 ? trigger : item).getBoundingClientRect();
                    const navbar = header.querySelector(".bihe-site-header__navbar");
                    const navbarRect = navbar === null || navbar === void 0 ? void 0 : navbar.getBoundingClientRect();
                    const headerScrolled = header.classList.contains("bihe-site-header--scrolled");
                    // Keep a small visual separation between trigger/navbar and submenu.
                    // User-requested range: 8–16px.
                    const submenuGap = 12;
                    const anchorBottom = headerScrolled && navbarRect ? navbarRect.bottom : rect.bottom;
                    const isColumns = submenu.classList.contains("bihe-site-header__submenu--columns");
                    const estimatedWidth = isColumns ? Math.min(29 * 16, window.innerWidth - viewportMargin * 2) : 248;
                    const submenuWidth = Math.max(submenu.scrollWidth, submenu.offsetWidth, submenu.getBoundingClientRect().width, estimatedWidth);
                    const viewportWidth = window.innerWidth;
                    let left = rect.left;
                    if (rect.right > viewportWidth * 0.55 || left + submenuWidth > viewportWidth - viewportMargin) {
                        left = rect.right - submenuWidth;
                    }
                    const maxLeft = viewportWidth - submenuWidth - viewportMargin;
                    left = Math.max(viewportMargin, Math.min(left, maxLeft));
                    const containingOrigin = getFixedContainingBlockOrigin(submenu);
                    const viewportTop = anchorBottom + submenuGap;
                    submenu.style.setProperty("--submenu-top", "".concat(Math.round(viewportTop - containingOrigin.top), "px"));
                    submenu.style.setProperty("--submenu-left", "".concat(Math.round(left - containingOrigin.left), "px"));
                    submenu.style.setProperty("--submenu-width", "".concat(Math.round(submenuWidth), "px"));
                    submenu.style.removeProperty("--submenu-right");
                }
            }["Header.useEffect.syncSubmenuPosition"];
            const scheduleSync = {
                "Header.useEffect.scheduleSync": ()=>{
                    requestAnimationFrame(syncSubmenuPosition);
                }
            }["Header.useEffect.scheduleSync"];
            scheduleSync();
            requestAnimationFrame({
                "Header.useEffect": ()=>requestAnimationFrame(syncSubmenuPosition)
            }["Header.useEffect"]);
            const item = header.querySelector('[data-nav-dropdown="'.concat(CSS.escape(openDropdown), '"]'));
            const ro = new ResizeObserver(scheduleSync);
            ro.observe(header);
            if (item) ro.observe(item);
            const submenu = item === null || item === void 0 ? void 0 : item.querySelector(".bihe-site-header__submenu");
            if (submenu) ro.observe(submenu);
            const onBreakpointChange = {
                "Header.useEffect.onBreakpointChange": ()=>{
                    if (!desktopMq.matches) {
                        scheduleSync();
                        return;
                    }
                    scheduleSync();
                }
            }["Header.useEffect.onBreakpointChange"];
            window.addEventListener("resize", scheduleSync);
            window.addEventListener("scroll", scheduleSync, {
                passive: true
            });
            desktopMq.addEventListener("change", onBreakpointChange);
            const lenis = window.__lenis;
            lenis === null || lenis === void 0 ? void 0 : lenis.on("scroll", scheduleSync);
            const closeOnOutsideClick = {
                "Header.useEffect.closeOnOutsideClick": (event)=>{
                    const target = event.target;
                    if (target.closest('[data-nav-dropdown="'.concat(CSS.escape(openDropdown), '"]'))) {
                        return;
                    }
                    setOpenDropdown(null);
                }
            }["Header.useEffect.closeOnOutsideClick"];
            document.addEventListener("mousedown", closeOnOutsideClick);
            return ({
                "Header.useEffect": ()=>{
                    ro.disconnect();
                    window.removeEventListener("resize", scheduleSync);
                    window.removeEventListener("scroll", scheduleSync);
                    desktopMq.removeEventListener("change", onBreakpointChange);
                    lenis === null || lenis === void 0 ? void 0 : lenis.off("scroll", scheduleSync);
                    document.removeEventListener("mousedown", closeOnOutsideClick);
                    header.querySelectorAll(".bihe-site-header__submenu").forEach({
                        "Header.useEffect": (submenu)=>{
                            submenu.style.removeProperty("--submenu-top");
                            submenu.style.removeProperty("--submenu-left");
                            submenu.style.removeProperty("--submenu-right");
                            submenu.style.removeProperty("--submenu-width");
                        }
                    }["Header.useEffect"]);
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], [
        openDropdown,
        scrolled
    ]);
    const toggleDropdown = (label)=>{
        setOpenDropdown((current)=>current === label ? null : label);
    };
    const handleDropdownTrigger = (event, item, hasSubmenu)=>{
        if (!hasSubmenu) return;
        event.preventDefault();
        event.stopPropagation();
        toggleDropdown(item.label);
    };
    const closeMenu = ()=>{
        setMenuOpen(false);
        setOpenDropdown(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        ref: headerRef,
        className: "bihe-site-header".concat(scrolled ? " bihe-site-header--scrolled" : "").concat(menuOpen ? " bihe-site-header--menu-open" : ""),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bihe-site-header__topbar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bihe-site-header__container bihe-site-header__topbar-inner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bihe-site-header__follow",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Follow Us :"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/landing/Header.tsx",
                                    lineNumber: 440,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SocialIcon, {
                                    label: "Facebook",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FacebookIcon"], {
                                        className: "bihe-site-header__social-icon",
                                        size: 15
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/landing/Header.tsx",
                                        lineNumber: 442,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/landing/Header.tsx",
                                    lineNumber: 441,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SocialIcon, {
                                    label: "LinkedIn",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinkedInIcon"], {
                                        className: "bihe-site-header__social-icon",
                                        size: 15
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/landing/Header.tsx",
                                        lineNumber: 445,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/landing/Header.tsx",
                                    lineNumber: 444,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SocialIcon, {
                                    label: "YouTube",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YouTubeIcon"], {
                                        className: "bihe-site-header__social-icon",
                                        size: 15
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/landing/Header.tsx",
                                        lineNumber: 448,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/landing/Header.tsx",
                                    lineNumber: 447,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SocialIcon, {
                                    label: "Instagram",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstagramIcon"], {
                                        className: "bihe-site-header__social-icon",
                                        size: 15
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/landing/Header.tsx",
                                        lineNumber: 451,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/landing/Header.tsx",
                                    lineNumber: 450,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/landing/Header.tsx",
                            lineNumber: 439,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bihe-site-header__topbar-actions",
                            children: [
                                prospectus ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: prospectus.href,
                                    className: "bihe-site-header__topbar-link bihe-site-header__topbar-link--prospectus",
                                    target: prospectus.openInNewTab ? "_blank" : undefined,
                                    rel: prospectus.openInNewTab ? "noopener noreferrer" : undefined,
                                    children: prospectus.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/landing/Header.tsx",
                                    lineNumber: 456,
                                    columnNumber: 15
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].gallery,
                                    className: "bihe-site-header__topbar-link".concat(isGalleryPath(pathname) ? " is-active" : ""),
                                    "aria-current": isGalleryPath(pathname) ? "page" : undefined,
                                    children: "Gallery"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/landing/Header.tsx",
                                    lineNumber: 465,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bihe-site-header__topbar-dropdown bihe-site-header__nav-item--dropdown".concat(openDropdown === ALUMNI_TOPBAR_ITEM.label ? " is-open" : "").concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$alumni$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAlumniPath"])(pathname) ? " is-active" : ""),
                                    "data-nav-dropdown": ALUMNI_TOPBAR_ITEM.label,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bihe-site-header__topbar-link-group bihe-site-header__topbar-link-group--menu".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$alumni$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAlumniPath"])(pathname) ? " is-active" : "").concat(openDropdown === ALUMNI_TOPBAR_ITEM.label ? " is-open" : ""),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: ALUMNI_TOPBAR_ITEM.href,
                                                    className: "bihe-site-header__topbar-link bihe-site-header__topbar-link--menu",
                                                    "aria-current": (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$alumni$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAlumniPath"])(pathname) ? "page" : undefined,
                                                    "aria-expanded": openDropdown === ALUMNI_TOPBAR_ITEM.label,
                                                    onClick: (e)=>handleDropdownTrigger(e, ALUMNI_TOPBAR_ITEM, true),
                                                    children: ALUMNI_TOPBAR_ITEM.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/landing/Header.tsx",
                                                    lineNumber: 483,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "bihe-site-header__topbar-chevron-btn bihe-site-header__topbar-chevron-btn--menu".concat(openDropdown === ALUMNI_TOPBAR_ITEM.label ? " is-open" : ""),
                                                    "aria-expanded": openDropdown === ALUMNI_TOPBAR_ITEM.label,
                                                    "aria-label": "".concat(openDropdown === ALUMNI_TOPBAR_ITEM.label ? "Close" : "Open", " Alumni submenu"),
                                                    onClick: (e)=>handleDropdownTrigger(e, ALUMNI_TOPBAR_ITEM, true),
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconChevron, {}, void 0, false, {
                                                        fileName: "[project]/src/components/landing/Header.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/landing/Header.tsx",
                                                    lineNumber: 492,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/landing/Header.tsx",
                                            lineNumber: 478,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "bihe-site-header__submenu".concat(openDropdown === ALUMNI_TOPBAR_ITEM.label ? " bihe-site-header__submenu--open" : ""),
                                            role: "menu",
                                            children: ALUMNI_TOPBAR_ITEM.children.map((child)=>{
                                                const isChildActive = isSubmenuLinkActive(pathname, child.href, ALUMNI_TOPBAR_ITEM.children);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    role: "none",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: child.href,
                                                        className: "bihe-site-header__submenu-link".concat(isChildActive ? " is-active" : ""),
                                                        role: "menuitem",
                                                        "aria-current": isChildActive ? "page" : undefined,
                                                        onClick: ()=>setOpenDropdown(null),
                                                        children: child.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/landing/Header.tsx",
                                                        lineNumber: 519,
                                                        columnNumber: 23
                                                    }, this)
                                                }, child.label, false, {
                                                    fileName: "[project]/src/components/landing/Header.tsx",
                                                    lineNumber: 518,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/landing/Header.tsx",
                                            lineNumber: 504,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/landing/Header.tsx",
                                    lineNumber: 472,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].apply,
                                    className: "bihe-site-header__apply-top",
                                    children: [
                                        "Apply Now",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowRightIcon"], {}, void 0, false, {
                                            fileName: "[project]/src/components/landing/Header.tsx",
                                            lineNumber: 537,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/landing/Header.tsx",
                                    lineNumber: 535,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/landing/Header.tsx",
                            lineNumber: 454,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/landing/Header.tsx",
                    lineNumber: 438,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/landing/Header.tsx",
                lineNumber: 437,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bihe-site-header__navbar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bihe-site-header__container bihe-site-header__navbar-inner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "bihe-site-header__brand",
                            onClick: closeMenu,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$SmartImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartImage"], {
                                    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$images$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["images"].logo,
                                    alt: "BIHE",
                                    width: 80,
                                    height: 57,
                                    className: "bihe-site-header__logo",
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/landing/Header.tsx",
                                    lineNumber: 546,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "bihe-site-header__brand-text",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bihe-site-header__brand-kn",
                                            lang: "kn",
                                            children: "ಬಾಪೂಜಿ ಇನ್ಸ್ಟಿಟ್ಯೂಟ್ ಆಫ್ ಹೈಟೆಕ್ ಎಜುಕೇಶನ್"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/landing/Header.tsx",
                                            lineNumber: 555,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bihe-site-header__brand-en",
                                            lang: "en",
                                            children: "Bapuji Institute of High-Tech Education"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/landing/Header.tsx",
                                            lineNumber: 558,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/landing/Header.tsx",
                                    lineNumber: 554,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/landing/Header.tsx",
                            lineNumber: 545,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "bihe-site-header__nav".concat(menuOpen ? " is-open" : ""),
                            "aria-label": "Main navigation",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "bihe-site-header__nav-list",
                                    children: navItems.map((item)=>{
                                        var _item_children;
                                        const hasSubmenu = Boolean((_item_children = item.children) === null || _item_children === void 0 ? void 0 : _item_children.length);
                                        const isDropdownOpen = openDropdown === item.label;
                                        const isActive = isNavItemActive(pathname, item);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            "data-nav-dropdown": hasSubmenu ? item.label : undefined,
                                            className: "bihe-site-header__nav-item".concat(hasSubmenu ? " bihe-site-header__nav-item--dropdown" : "").concat(isDropdownOpen ? " is-open" : ""),
                                            children: [
                                                hasSubmenu ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bihe-site-header__nav-link-group".concat(isActive ? " is-active" : ""),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: item.href,
                                                            className: "bihe-site-header__nav-link",
                                                            "aria-expanded": isDropdownOpen,
                                                            onClick: (e)=>handleDropdownTrigger(e, item, hasSubmenu),
                                                            children: item.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/landing/Header.tsx",
                                                            lineNumber: 584,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "bihe-site-header__chevron-btn".concat(isDropdownOpen ? " is-open" : ""),
                                                            "aria-expanded": isDropdownOpen,
                                                            "aria-label": "".concat(isDropdownOpen ? "Close" : "Open", " ").concat(item.label, " submenu"),
                                                            onClick: (e)=>handleDropdownTrigger(e, item, hasSubmenu),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconChevron, {}, void 0, false, {
                                                                fileName: "[project]/src/components/landing/Header.tsx",
                                                                lineNumber: 599,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/landing/Header.tsx",
                                                            lineNumber: 592,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/landing/Header.tsx",
                                                    lineNumber: 581,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: item.href,
                                                    className: "bihe-site-header__nav-link".concat(isActive ? " is-active" : ""),
                                                    onClick: closeMenu,
                                                    children: [
                                                        item.label,
                                                        item.dropdown ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconChevron, {}, void 0, false, {
                                                            fileName: "[project]/src/components/landing/Header.tsx",
                                                            lineNumber: 609,
                                                            columnNumber: 42
                                                        }, this) : null
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/landing/Header.tsx",
                                                    lineNumber: 603,
                                                    columnNumber: 23
                                                }, this),
                                                hasSubmenu ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "bihe-site-header__submenu".concat(isDropdownOpen ? " bihe-site-header__submenu--open" : "").concat(item.children.length >= 10 ? " bihe-site-header__submenu--columns" : ""),
                                                    role: "menu",
                                                    children: item.children.map((child)=>{
                                                        const isChildActive = isSubmenuLinkActive(pathname, child.href, item.children);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            role: "none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: child.href,
                                                                className: "bihe-site-header__submenu-link".concat(isChildActive ? " is-active" : ""),
                                                                role: "menuitem",
                                                                "aria-current": isChildActive ? "page" : undefined,
                                                                onClick: ()=>{
                                                                    setOpenDropdown(null);
                                                                    closeMenu();
                                                                },
                                                                children: child.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/landing/Header.tsx",
                                                                lineNumber: 633,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, child.label, false, {
                                                            fileName: "[project]/src/components/landing/Header.tsx",
                                                            lineNumber: 632,
                                                            columnNumber: 29
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/landing/Header.tsx",
                                                    lineNumber: 614,
                                                    columnNumber: 23
                                                }, this) : null
                                            ]
                                        }, item.label, true, {
                                            fileName: "[project]/src/components/landing/Header.tsx",
                                            lineNumber: 575,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/landing/Header.tsx",
                                    lineNumber: 568,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bihe-site-header__nav-extras",
                                    "aria-label": "Quick links",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "bihe-site-header__nav-extras-list",
                                            children: [
                                                prospectus ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "bihe-site-header__nav-extras-item",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: prospectus.href,
                                                        className: "bihe-site-header__nav-extras-link",
                                                        target: prospectus.openInNewTab ? "_blank" : undefined,
                                                        rel: prospectus.openInNewTab ? "noopener noreferrer" : undefined,
                                                        onClick: closeMenu,
                                                        children: prospectus.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/landing/Header.tsx",
                                                        lineNumber: 661,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/landing/Header.tsx",
                                                    lineNumber: 660,
                                                    columnNumber: 19
                                                }, this) : null,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "bihe-site-header__nav-extras-item",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].gallery,
                                                        className: "bihe-site-header__nav-extras-link".concat(isGalleryPath(pathname) ? " is-active" : ""),
                                                        "aria-current": isGalleryPath(pathname) ? "page" : undefined,
                                                        onClick: closeMenu,
                                                        children: "Gallery"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/landing/Header.tsx",
                                                        lineNumber: 673,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/landing/Header.tsx",
                                                    lineNumber: 672,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "bihe-site-header__nav-extras-item bihe-site-header__nav-item--dropdown".concat(openDropdown === "Alumni (menu)" ? " is-open" : ""),
                                                    "data-nav-dropdown": "Alumni (menu)",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bihe-site-header__nav-link-group",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: ALUMNI_TOPBAR_ITEM.href,
                                                                    className: "bihe-site-header__nav-extras-link".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$alumni$2d$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAlumniPath"])(pathname) ? " is-active" : ""),
                                                                    "aria-expanded": openDropdown === "Alumni (menu)",
                                                                    onClick: (e)=>handleDropdownTrigger(e, {
                                                                            ...ALUMNI_TOPBAR_ITEM,
                                                                            label: "Alumni (menu)"
                                                                        }, true),
                                                                    children: "Alumni"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/landing/Header.tsx",
                                                                    lineNumber: 689,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: "bihe-site-header__chevron-btn".concat(openDropdown === "Alumni (menu)" ? " is-open" : ""),
                                                                    "aria-expanded": openDropdown === "Alumni (menu)",
                                                                    "aria-label": "".concat(openDropdown === "Alumni (menu)" ? "Close" : "Open", " Alumni submenu"),
                                                                    onClick: (e)=>handleDropdownTrigger(e, {
                                                                            ...ALUMNI_TOPBAR_ITEM,
                                                                            label: "Alumni (menu)"
                                                                        }, true),
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconChevron, {}, void 0, false, {
                                                                        fileName: "[project]/src/components/landing/Header.tsx",
                                                                        lineNumber: 716,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/landing/Header.tsx",
                                                                    lineNumber: 703,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/landing/Header.tsx",
                                                            lineNumber: 688,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                            className: "bihe-site-header__submenu".concat(openDropdown === "Alumni (menu)" ? " bihe-site-header__submenu--open" : ""),
                                                            role: "menu",
                                                            children: ALUMNI_TOPBAR_ITEM.children.map((child)=>{
                                                                const isChildActive = isSubmenuLinkActive(pathname, child.href, ALUMNI_TOPBAR_ITEM.children);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                    role: "none",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: child.href,
                                                                        className: "bihe-site-header__submenu-link".concat(isChildActive ? " is-active" : ""),
                                                                        role: "menuitem",
                                                                        "aria-current": isChildActive ? "page" : undefined,
                                                                        onClick: closeMenu,
                                                                        children: child.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/landing/Header.tsx",
                                                                        lineNumber: 734,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, child.label, false, {
                                                                    fileName: "[project]/src/components/landing/Header.tsx",
                                                                    lineNumber: 733,
                                                                    columnNumber: 25
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/landing/Header.tsx",
                                                            lineNumber: 719,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/landing/Header.tsx",
                                                    lineNumber: 682,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/landing/Header.tsx",
                                            lineNumber: 658,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$links$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SITE_LINKS"].apply,
                                            className: "bihe-site-header__nav-extras-apply",
                                            onClick: closeMenu,
                                            children: [
                                                "Apply Now",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrowRightIcon"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/landing/Header.tsx",
                                                    lineNumber: 757,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/landing/Header.tsx",
                                            lineNumber: 751,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/landing/Header.tsx",
                                    lineNumber: 657,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/landing/Header.tsx",
                            lineNumber: 564,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "bihe-site-header__menu-btn".concat(menuOpen ? " is-active" : ""),
                            "aria-expanded": menuOpen,
                            "aria-label": "Toggle menu",
                            onClick: ()=>setMenuOpen((o)=>!o),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                    fileName: "[project]/src/components/landing/Header.tsx",
                                    lineNumber: 769,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                    fileName: "[project]/src/components/landing/Header.tsx",
                                    lineNumber: 770,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                    fileName: "[project]/src/components/landing/Header.tsx",
                                    lineNumber: 771,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/landing/Header.tsx",
                            lineNumber: 762,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/landing/Header.tsx",
                    lineNumber: 544,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/landing/Header.tsx",
                lineNumber: 543,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/landing/Header.tsx",
        lineNumber: 433,
        columnNumber: 5
    }, this);
}
_s(Header, "BxmY9jnIozGrxDmJxtGTLMW1sdc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c2 = Header;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "IconChevron");
__turbopack_context__.k.register(_c1, "SocialIcon");
__turbopack_context__.k.register(_c2, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_47efb2e5._.js.map