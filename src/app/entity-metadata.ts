import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {};

const pluralNames = {
  Character: 'Characters',
 };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
