function About() {
  return (
    <div className="about">
      <div className="profile-container">
        <img 
          src="/profile/dadpic.jpg" 
          alt="Mat Grogan" 
          className="profile-photo" 
        />
        <div className="bio">
          <h2>About Mat Grogan</h2>
          <p>
            Mat Grogan is a passionate oil painter known for his distinctive style
            and masterful use of color. With years of experience in traditional oil
            painting techniques, Mat creates pieces that capture the essence of his
            subjects, whether they're landscapes, seascapes, or still life compositions.
          </p>
          <p>
            Each painting is crafted with meticulous attention to detail, employing
            classical techniques while incorporating contemporary elements. Mat's work
            has been featured in various galleries and has found homes in private
            collections throughout the region.
          </p>
          <p>
            His artistic journey began with a deep appreciation for natural landscapes
            and the interplay of light and shadow. This passion evolved into a
            full-time pursuit of creating beautiful, timeless pieces that resonate
            with viewers and collectors alike.
          </p>
          <div className="contact-info">
            <h3>Contact</h3>
            <p>For inquiries about paintings or commissions, please get in touch:</p>
            <a href="mailto:contact@matgroganoils.com">contact@matgroganoils.com</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About