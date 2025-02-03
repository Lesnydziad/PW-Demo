import { execSync } from 'child_process';

export default async function globalSetup() {
  // delleting allure files before starting new tests
  execSync('powershell.exe Remove-Item -Recurse -Force allure-results/*');
}