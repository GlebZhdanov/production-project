import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Profile } from 'entities/Profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { $api } from 'shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
  id: '1',
  first: 'admin',
  lastname: 'admin',
  age: 465,
  currency: Currency.USD,
  country: Country.Kazakhstan,
  city: 'Moscow',
  username: 'admin213',
};

const option = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: { id: '1', username: 'admin' },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe('features/EditableProfileCard', () => {
  test('Режим редактирование формы', async () => {
    componentRender(<EditableProfileCard id="1" />, option);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
  });
  test('При отмене значения должны обнуляться', async () => {
    componentRender(<EditableProfileCard id="1" />, option);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));
    await userEvent.clear(screen.getByTestId('ProfileCard.lastName'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'user');
    await userEvent.type(screen.getByTestId('ProfileCard.lastName'), 'user');

    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('user');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('admin');
    expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('admin');
  });
  test('Ошибка валидации', async () => {
    componentRender(<EditableProfileCard id="1" />, option);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

    expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
  });
  test('Если нет ощибок валидации, то на сервер должен улететь запрос ', async () => {
    const mockPutReg = jest.spyOn($api, 'put');
    componentRender(<EditableProfileCard id="1" />, option);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'user');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

    expect(mockPutReg).toHaveBeenCalled();
  });
});
