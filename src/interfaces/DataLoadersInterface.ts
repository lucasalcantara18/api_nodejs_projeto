import * as DataLoader from 'dataloader';
import { UserInstance } from '../models/UserModel';
import { PostInstance } from '../models/PosModel';
import { DataLoaderParam } from './DataLoaderParamInterface';

export interface DataLoaders {
    //interface para dataloaders, que servem para otimizar as chamadas ao banco de dados
    //processar buscas no db em lotes.
    userLoader: DataLoader<DataLoaderParam<number>, UserInstance>;
    postLoader: DataLoader<DataLoaderParam<number>, PostInstance>;

}