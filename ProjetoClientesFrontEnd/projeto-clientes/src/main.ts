import { bootstrapApplication } from '@angular/platform-browser';
import { PrincipalComponent } from './app/principal/principal.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(PrincipalComponent, {
  providers: [provideHttpClient()],
});
