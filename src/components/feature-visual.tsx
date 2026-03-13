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

function HeadersVisual() {
  return (
    <div className="space-y-1">
      <div className="text-[11px] font-mono text-neutral-600 mb-3">Generated for Next.js</div>
      {[
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=()' },
      ].map((header) => (
        <div key={header.key} className="text-[11px] font-mono leading-relaxed">
          <span className="text-emerald-800">{header.key}</span>
          <span className="text-neutral-700">: </span>
          <span className="text-neutral-500">{header.value}</span>
        </div>
      ))}
    </div>
  );
}

function RaspVisual() {
  const events = [
    { time: '14:32:01', type: 'SQL Injection', action: 'Blocked', path: '/api/users' },
    { time: '14:32:04', type: 'XSS', action: 'Blocked', path: '/search' },
    { time: '14:33:12', type: 'Path Traversal', action: 'Blocked', path: '/files/download' },
    { time: '14:35:07', type: 'SSRF', action: 'Blocked', path: '/api/fetch' },
  ];
  return (
    <div className="space-y-1">
      <div className="text-[11px] font-mono text-neutral-600 mb-3">Threat Log</div>
      {events.map((event, i) => (
        <div key={i} className="flex items-center gap-3 text-[11px] font-mono py-1">
          <span className="text-neutral-700">{event.time}</span>
          <span className="text-red-700/80">{event.type}</span>
          <span className="text-emerald-800">{event.action}</span>
          <span className="text-neutral-600">{event.path}</span>
        </div>
      ))}
    </div>
  );
}

function DefenseVisual() {
  const policies = [
    { name: 'Rate Limit', trigger: '> 100 req/min', action: 'Throttle' },
    { name: 'Brute Force', trigger: '5 failed logins', action: 'Block IP' },
    { name: 'Suspicious Payload', trigger: 'High confidence', action: 'Block' },
    { name: 'Geo Restriction', trigger: 'Blocked region', action: 'Deny' },
  ];
  return (
    <div>
      <div className="text-[11px] font-mono text-neutral-600 mb-3">Defense Policies</div>
      <div className="space-y-2">
        {policies.map((policy) => (
          <div key={policy.name} className="flex items-center justify-between text-[11px] font-mono py-1.5 border-b border-white/[0.03] last:border-0">
            <span className="text-neutral-400">{policy.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-neutral-600">{policy.trigger}</span>
              <span className="text-emerald-800">{policy.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SastVisual() {
  const findings = [
    { severity: 'High', file: 'auth/login.js', issue: 'Hardcoded secret', line: 42 },
    { severity: 'Med', file: 'api/handler.py', issue: 'Unsafe deserialization', line: 118 },
    { severity: 'Low', file: 'utils/parse.ts', issue: 'Prototype pollution risk', line: 23 },
  ];
  return (
    <div>
      <div className="text-[11px] font-mono text-neutral-600 mb-3">Code Analysis</div>
      <div className="space-y-2.5">
        {findings.map((f, i) => (
          <div key={i} className="space-y-0.5">
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className={`px-1 py-0.5 rounded text-[10px] ${
                f.severity === 'High' ? 'bg-red-900/30 text-red-500' :
                f.severity === 'Med' ? 'bg-amber-900/30 text-amber-500' :
                'bg-neutral-800 text-neutral-400'
              }`}>{f.severity}</span>
              <span className="text-neutral-400">{f.file}</span>
              <span className="text-neutral-700">L{f.line}</span>
            </div>
            <div className="text-[11px] text-neutral-600 pl-1">{f.issue}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComplianceVisual() {
  const frameworks = [
    { name: 'SOC 2', coverage: 87 },
    { name: 'PCI-DSS', coverage: 92 },
    { name: 'HIPAA', coverage: 78 },
    { name: 'CIS', coverage: 95 },
  ];
  return (
    <div>
      <div className="text-[11px] font-mono text-neutral-600 mb-3">Framework Coverage</div>
      <div className="space-y-3">
        {frameworks.map((fw) => (
          <div key={fw.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-neutral-400">{fw.name}</span>
              <span className="text-emerald-700">{fw.coverage}%</span>
            </div>
            <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-800 rounded-full"
                style={{ width: `${fw.coverage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DependenciesVisual() {
  const deps = [
    { name: 'lodash', version: '4.17.20', vulns: 2, severity: 'high' },
    { name: 'express', version: '4.18.2', vulns: 0, severity: 'none' },
    { name: 'jsonwebtoken', version: '8.5.1', vulns: 1, severity: 'medium' },
    { name: 'axios', version: '1.6.0', vulns: 0, severity: 'none' },
  ];
  return (
    <div>
      <div className="text-[11px] font-mono text-neutral-600 mb-3">Dependencies (SBOM)</div>
      <div className="space-y-2">
        {deps.map((dep) => (
          <div key={dep.name} className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-white/[0.03] last:border-0">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">{dep.name}</span>
              <span className="text-neutral-700">{dep.version}</span>
            </div>
            {dep.vulns > 0 ? (
              <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                dep.severity === 'high' ? 'bg-red-900/30 text-red-500' : 'bg-amber-900/30 text-amber-500'
              }`}>{dep.vulns} CVE{dep.vulns > 1 ? 's' : ''}</span>
            ) : (
              <span className="text-emerald-800 text-[10px]">clean</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const visuals: Record<FeatureVisualProps['type'], React.ReactNode> = {
  scanner: <ScannerVisual />,
  siteHealth: <SiteHealthVisual />,
  headers: <HeadersVisual />,
  rasp: <RaspVisual />,
  defense: <DefenseVisual />,
  sast: <SastVisual />,
  compliance: <ComplianceVisual />,
  dependencies: <DependenciesVisual />,
};

export function FeatureVisual({ type }: FeatureVisualProps) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-[#080808] overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.04]">
        <div className="h-2 w-2 rounded-full bg-white/[0.08]" />
        <div className="h-2 w-2 rounded-full bg-white/[0.08]" />
        <div className="h-2 w-2 rounded-full bg-white/[0.08]" />
      </div>
      <div className="p-5">
        {visuals[type]}
      </div>
    </div>
  );
}
