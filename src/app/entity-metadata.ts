import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Character: {
    entityDispatcherOptions: {
      optimisticSaveEntities: true,
      optimisticDelete: true
    }
  },
  Comic: {
    entityDispatcherOptions: {
      optimisticSaveEntities: true,
      optimisticDelete: true
    }

  },
};

const pluralNames = {
  Character: 'Characters',
  Comic:'Comics'
 };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
