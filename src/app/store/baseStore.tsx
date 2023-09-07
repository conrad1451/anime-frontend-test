import { produce } from 'immer';
import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

const useStore = create(subscribeWithSelector(persist(devtools((set: any) => ({
  commonState: 'initialValue',
  favorites: [],
  taskInOngoing: [],
  jokes : [] 
})), { name: 'store' })));

useStore.subscribe(
    (store => store.favorites),
    (newFavorites, prevFavorites) => {
        useStore.setState({
            taskInOngoing: newFavorites.favorites.filter((favorite: { state: string; }) => favorite.state === 'ONGOING')
                .length,
        })
    }
)

export default useStore