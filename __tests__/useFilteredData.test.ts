import useFilteredData from '../src/hooks/useFilteredData';
import {renderHook} from '@testing-library/react-native';
import {it, describe, expect} from '@jest/globals';

describe('useFilteredData', () => {
  const mockData = [
    {name: 'The Birds'},
    {name: 'Rear Window'},
    {name: 'Family Pot'},
    {name: 'The Birds'},
    {name: 'Rear Window'},
    {name: 'Family Pot'},
    {name: 'The Birds with an Extra long title'},
  ];

  it('should return the full data when search is not active', () => {
    const {result} = renderHook(() => useFilteredData(mockData, '', false));

    expect(result.current).toEqual(mockData);
  });

  it('should return filtered data when search is active', () => {
    const {result} = renderHook(() => useFilteredData(mockData, 'Birds', true));

    expect(result.current).toEqual([
      {name: 'The Birds'},
      {name: 'The Birds'},
      {name: 'The Birds with an Extra long title'},
    ]);
  });

  it('should return an empty array when search is active and no items match', () => {
    const {result} = renderHook(() =>
      useFilteredData(mockData, 'Non-existent', true),
    );

    expect(result.current).toEqual([]);
  });

  it('should return undefined when data is undefined', () => {
    const {result} = renderHook(() => useFilteredData(undefined, '', false));

    expect(result.current).toBeUndefined();
  });

  it('should handle case insensitive search', () => {
    const {result} = renderHook(() => useFilteredData(mockData, 'pot', true));

    expect(result.current).toEqual([
      {name: 'Family Pot'},
      {name: 'Family Pot'},
    ]);
  });
});
