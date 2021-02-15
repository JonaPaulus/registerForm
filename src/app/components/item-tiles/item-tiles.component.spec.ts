import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTilesComponent } from './item-tiles.component';

describe('ItemTilesComponent', () => {
  let component: ItemTilesComponent;
  let fixture: ComponentFixture<ItemTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
