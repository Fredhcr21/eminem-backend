import { Car, CarModel } from "../models";
import { PaginationQuery, ResponsePagination } from "../types";



export const find = async (paginationQuery: PaginationQuery): Promise<ResponsePagination<CarModel>> => {
    // Run Query
    const totalCount = await Car.estimatedDocumentCount()

    let query = Car.find();
    const items = await query.sort(paginationQuery.sort).limit(paginationQuery.limit).skip(paginationQuery.skip).exec();

    return {
        items,
        totalCount
    }
}

export const getById = async (id: string): Promise<CarModel> => {
    const car = await Car.findById(id);

    if(!car) throw 'Could not find Car with the given ID'

    return car;
}

export const create = async (car: CarModel): Promise<CarModel> => {
    const saveNewCar = await new Car(car).save();
    return saveNewCar;
}

export const update = async (id: string, car: CarModel): Promise<CarModel> => {
    const updateCar = await Car.findByIdAndUpdate(id, car, {new: true})

    if(!updateCar) throw 'Car doesn`t exists'

    return updateCar;
}


export const deleteById = async(id: string): Promise<CarModel> => {
    const deleteCar = await Car.findByIdAndDelete(id);

    if(!deleteCar) throw 'The current Car doesn`t exists'

    return deleteCar;
} 