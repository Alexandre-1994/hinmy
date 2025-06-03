import { Injectable } from '@angular/core';
import packageInfo from '../../../package.json';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private version: string;

  constructor() {
    this.version = packageInfo.version;
  }

  getVersion(): string {
    return this.version;
  }

  getFullVersion(): string {
    return `v${this.version}`;
  }
} 