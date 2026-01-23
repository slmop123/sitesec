
export interface Vulnerability {
  id: number;
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  category: string;
}

export interface ScanResult {
  vulnerabilities: Array<{
    type: string;
    severity: string;
    line?: number;
    description: string;
    fix: string;
  }>;
  summary: string;
}
