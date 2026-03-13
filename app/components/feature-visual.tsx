interface FeatureVisualProps {
  type: 'scanner' | 'siteHealth' | 'headers' | 'rasp' | 'defense' | 'sast' | 'compliance' | 'dependencies';
}

function ScannerVisual() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-600">
        <span className="text-neutral-500">Target:</span>
        <span className="text-emerald-700">https://example.com</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-lg bg-emerald-900/20 border border-emerald-800/30 flex items-center justify-center">
          <span className="text-xl font-bold text-emerald-500">A</span>
        </div>
        <div>
          <div className="text-[13px] text-neutral-300">Score: 94/100</div>
          <div className="text-[11px] text-neutral-600">12 checks passed, 1 warning</div>
        </div>
      </div>
      <div className="space-y-1.5 pt-2">
        {[
          { label: 'Security Headers', pass: true },
          { label: 'TLS Configuration', pass: true },
          { label: 'Cookie Policy', pass: true },
          { label: 'HSTS', pass: true },
          { label: 'Content-Security-Policy', pass: false },
          { label: 'Referrer Policy', pass: true },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-[11px] font-mono">
            <span className={item.pass ? 'text-emerald-700' : 'text-amber-700'}>
              {item.pass ? '\u2713' : '\u2717'}
            </span>
            <span className="text-neutral-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SiteHealthVisual() {
  const sites = [
    { domain: 'app.example.com', grade: 'A', color: 'emerald' },
    { domain: 'api.example.com', grade: 'B+', color: 'emerald' },
    { domain: 'docs.example.com', grade: 'A-', color: 'emerald' },
    { domain: 'staging.example.com', grade: 'C', color: 'amber' },
  ];
  return (
    <div className="space-y-3">
      <div className="text-[11px] font-mono text-neutral-600 mb-3">Monitored Sites</div>
      {sites.map((site) => (
        <div key={site.domain} className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0">
          <div className="flex items-center gap-2.5">
            <div className={`h-1.5 w-1.5 rounded-full ${site.color === 'emerald' ? 'bg-emerald-600' : 'bg-amber-600'}`} />
            <span className="text-[12px] font-mono text-neutral-400">{site.domain}</span>
          </div>
          <span className={`text-[12px] font-bold ${site.color === 'emerald' ? 'text-emerald-600' : 'text-amber-600'}`}>
            {site.grade}
          </span>
        </div>
      ))}
    </div>
  );
}

// ...other visuals for headers, rasp, defense, sast, compliance, dependencies...

export function FeatureVisual({ type }: FeatureVisualProps) {
  switch (type) {
    case 'scanner':
      return <ScannerVisual />;
    case 'siteHealth':
      return <SiteHealthVisual />;
    // Add other cases as needed
    default:
      return <div>Visual not implemented</div>;
  }
}