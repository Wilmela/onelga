import MaxWidthWrapper from "./max-width-wrapper";
import SectionHeader from "./section-header";

const Map = () => {
  
  return (
    <section className="bg-app-dark-green/10">
      <MaxWidthWrapper className="p-y" id="map">
        <SectionHeader
          title="ONELGA Secretariat"
          description="Locate secretariat on the map."
        />
        
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.4616050518903!2d6.654943575652979!3d5.346288694632382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1042160f46db07ab%3A0x2b90c6d120e7ba03!2sOgba%20-%20Egbema%20-%20Ndoni%20Local%20Government%20Council%20Secretariat%20Complex!5e0!3m2!1sen!2sng!4v1769522136035!5m2!1sen!2sng"
          // width="100%"
          // height="650"
          style={{ border: 100 }}
          loading={"lazy"}
          referrerPolicy="no-referrer-when-downgrade"
          className="h-50 md:h-125 w-full"
        />
      </MaxWidthWrapper>
    </section>
  );
};

export default Map;
