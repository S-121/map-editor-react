import cn from 'clsx'
import React from 'react'
import s from './Swatch.module.css'
import { Check } from '@components/icons'
import Button, { ButtonProps } from '@components/ui/Button'
import { isDark } from '@lib/colors'
interface SwatchProps {
  active?: boolean
  children?: any
  className?: string
  variant?: 'size' | 'color' | string
  color?: string
  label?: string | null
}

const Swatch: React.FC<Omit<ButtonProps, 'variant'> & SwatchProps> = ({
  active,
  className,
  color = '',
  label = null,
  variant = 'size',
  ...props
}) => {
  variant = variant?.toLowerCase()

  if (label) {
    label = label?.toLowerCase()
  }

  const swatchClassName = cn(
    s.swatch,
    {
      [s.color]: color,
      [s.active]: active,
      [s.size]: variant === 'size',
      [s.dark]: color ? isDark(color) : false,
      [s.textLabel]: !color && label && label.length > 3,
    },
    className
  )
  return (
    <>
      { (label != 'horizontal' && label != 'vertical') &&
        <Button
          role="option"
          aria-selected={active}
          aria-label={variant && label ? `${variant} ${label}` : 'Variant Swatch'}
          className={swatchClassName}
          {...(label && color && { title: label })}
          style={color ? { backgroundColor: color } : {}}
          {...props}
        >
          {color && active && (
            <span>
              <Check />
            </span>
          )}
          {!color ? label : null}
        </Button>
      }
      {label == 'horizontal' &&
        <button
          role="option"
          aria-selected={active}
          aria-label={variant && label ? `${variant} ${label}` : 'Variant Swatch'}
          {...props}
          className="relative"
          border-2 
          border-rose-600
        >
          <div className={active ? "w-4/5 border-[1px] border-solid border-amber-500 rounded-md mx-auto" : "w-4/5 mx-auto"}>
            <img 
              src="/assets/portrait.png" 
              width="70" 
              alt="horizontal" 
              className="p-2.5 mx-auto"
            />
            <input className={active ? "absolute bottom-[3rem] right-[0.6rem]" : "absolute bottom-[3rem] right-[0.6rem] hidden"} type="checkbox" checked={active ? true : ''}/>
          </div>
            <p className='py-3'>{label.toUpperCase()}</p>
        </button>
      }
      {label == 'vertical' &&
        <button
          role="option"
          aria-selected={active}
          aria-label={variant && label ? `${variant} ${label}` : 'Variant Swatch'}
          {...props}
          className="relative px-4"
        >
          <div className={active ? "mt-[16px] border-[1px] border-solid border-amber-500 rounded-md mx-auto" : "mt-[16px] mx-auto"}>
            <img src="/assets/sqare.png" 
              width="100" 
              alt={label}
              className="p-2.5 mx-auto h-[70px]"
            />
            <input className={active ? "absolute bottom-12 right-4":"absolute bottom-12 right-4 hidden"} type="checkbox" checked={active ? true : ''} />
          </div>
            <p className='py-3'>{label.toUpperCase()}</p>
        </button>
      }
    </>
  )
}

export default React.memo(Swatch)
