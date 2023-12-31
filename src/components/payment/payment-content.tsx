import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
import { RadioGroup } from '@headlessui/react';
import { useModalAction } from '@components/modal/modal.context';

const PaymentBox: React.FC<{ items: any }> = ({ items }) => {
  const { openModal } = useModalAction();

  function handlePopupView(item: any) {
    openModal('PAYMENT');
  }

  const removeItem = (id: any, title: string) => {
    var result = confirm(`Want to delete? ${title} Payment Card ?`);
  };
  const [selected, setSelected] = useState(items[0]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-auto text-[15px] text-black">
      <RadioGroup value={selected} onChange={setSelected}>
        <RadioGroup.Label className="sr-only">Default</RadioGroup.Label>
        {items?.map((item: any, index: any) => (
          <RadioGroup.Option
            key={index}
            value={item}
            className={({ active, checked }) =>
              `${checked ? '' : 'border-skin-base'}
                  border-2 relative shadow-md focus:outline-none rounded p-5 block cursor-pointer min-h-[112px] h-full group bg-repeat bg-cover address__box`
            }
            style={{
              backgroundImage: 'url(/assets/images/card.png)',
            }}
          >
            <RadioGroup.Label
              as="h2"
              className="font-semibold text-xl text-white pb-7"
            >
              {item?.title}
            </RadioGroup.Label>
            <RadioGroup.Description
              as="div"
              className="flex flex-col justify-between text-white"
            >
              <h2 className="text-2xl tracking-widest ">{`${item?.card?.number}`}</h2>
              <div className="flex text-white  pt-8">
                <div className="flex flex-col">
                  <span className="text-[12px] mb-[4px] font-medium">
                    Card Holder Name
                  </span>
                  <span className="text-sm  font-bold">{`${item?.card?.name}`}</span>
                </div>
                <div className="flex flex-col ms-auto">
                  <span className="text-[12px] mb-[4px] font-medium">
                    Zip Code
                  </span>
                  <span className="text-sm  font-bold">{`${item?.card?.address_zip}`}</span>
                </div>
              </div>
            </RadioGroup.Description>
            <div className="flex absolute end-3 top-3 z-30 lg:opacity-0 transition-all address__actions">
              <button
                className="flex justify-center items-center bg-[#F35C5C] h-5 w-5 rounded-full ms-"
                onClick={() => removeItem(item?.id, item?.title)}
              >
                <IoMdClose size={12} fill={'#fff'} />
              </button>
            </div>
          </RadioGroup.Option>
        ))}
      </RadioGroup>
      <button
        className="border-2 transition-all border-skin-base rounded-[16px] lg:rounded-[8px] font-semibold p-5 px-10 cursor-pointer text-skin-primary flex justify-start hover:border-skin-primary items-center min-h-[200px] h-full"
        onClick={handlePopupView}
      >
        <AiOutlinePlus size={18} className="me-2" />
        Add Payment
      </button>
    </div>
  );
};

export default PaymentBox;
