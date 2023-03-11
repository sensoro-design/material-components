import React from 'react';
import { Watermark } from '../index';
import { mountTest } from '../../../tests/shared/mountTest';
import { render } from '../../../tests/utils';

describe('Watermark', () => {
  const mockSrcSet = jest.spyOn(Image.prototype, 'src', 'set');

  beforeAll(() => {
    mockSrcSet.mockImplementation(function fn() {
      this.onload?.();
    });
  });

  afterAll(() => {
    mockSrcSet.mockRestore();
  });

  mountTest(Watermark);

  it('The watermark should render successfully', () => {
    const { container } = render(<Watermark className="watermark" content="Sensoro Design" />);
    expect(container.querySelector('.watermark div')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('The offset should be correct', () => {
    const { container } = render(
      <Watermark
        className="watermark"
        offset={[200, 200]}
        content={['Sensoro Design', 'Sensoro Design Pro']}
      />,
    );

    const target = container.querySelector<HTMLDivElement>('.watermark div');

    expect(target?.style.left).toBe('150px');
    expect(target?.style.top).toBe('150px');
    expect(target?.style.width).toBe('calc(100% - 150px)');
    expect(target?.style.height).toBe('calc(100% - 150px)');
    expect(container).toMatchSnapshot();
  });
})
