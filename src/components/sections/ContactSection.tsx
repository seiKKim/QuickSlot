import { businessInfo, contactMethods } from '@/data/company';

import React from 'react';
import { getPopularFAQs } from '@/data/faqs';

const ContactSection = () => {
  const popularFAQs = getPopularFAQs().slice(0, 3);

  return (
    <section id="contact" className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 메인 헤딩 */}
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-white mb-4">
            지금 바로 상담받으세요
          </h3>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            24시간 실시간 상담 서비스로 언제든지 문의하실 수 있습니다.<br />
            전문 상담사가 친절하게 안내해드리겠습니다.
          </p>
        </div>
        
        {/* 연락 방법 */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-xl">
              <div className="text-blue-600 mb-4 flex justify-center">
                {React.createElement(method.icon, { className: "w-12 h-12" })}
              </div>
              
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                {method.title}
              </h4>
              <p className="text-gray-600 mb-2">{method.subtitle}</p>
              <p className="text-lg font-medium text-gray-800 mb-4">
                {method.description}
              </p>
              
              <button className={`${method.buttonColor} px-8 py-3 rounded-lg font-semibold transition-colors w-full mb-4`}>
                {method.buttonText}
              </button>
              
              <p className="text-sm text-gray-500">
                {method.available}
              </p>
            </div>
          ))}
        </div>

        {/* 사업자 정보 */}
        {/* <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 mb-16">
          <h4 className="text-2xl font-bold text-white text-center mb-8">
            사업자 정보
          </h4>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessInfo.map((info, index) => (
              <div key={index} className="text-center">
                <div className="text-blue-200 mb-3 flex justify-center">
                  {React.createElement(info.icon, { className: "w-6 h-6" })}
                </div>
                <h5 className="text-lg font-semibold text-white mb-2">
                  {info.title}
                </h5>
                <p className="text-blue-100 text-sm whitespace-pre-line">
                  {info.content}
                </p>
              </div>
            ))}
          </div>
        </div> */}

        {/* 자주 묻는 질문 */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h4 className="text-2xl font-bold text-gray-900 text-center mb-8">
            자주 묻는 질문
          </h4>
          
          <div className="space-y-6">
            {popularFAQs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                <h5 className="text-lg font-semibold text-gray-900 mb-2">
                  Q. {faq.question}
                </h5>
                <p className="text-gray-600 pl-4">
                  A. {faq.answer}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              더 궁금한 점이 있으시나요?
            </p>
            <button className="btn-primary">
              더 많은 FAQ 보기
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;