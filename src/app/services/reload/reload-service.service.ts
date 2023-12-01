import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {
    private reloadFlag = false;

  shouldReload(): boolean {
    return this.reloadFlag;
  }

  setReloadFlag(value: boolean): Promise<boolean> {
    this.reloadFlag = value;
    return Promise.resolve(value);
  }

}
