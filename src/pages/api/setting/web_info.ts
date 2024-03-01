import connectDB from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { saveFile } from "@/utils/function";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    const og_img = files.og_img?.[0];
    const favico_img = files.favico_img?.[0];
    const logos = files.logos?.[0];
    const logo_footer = files.logo_footer?.[0];
    const logo_adm = files.logo_adm?.[0];
    const {
      site_name,
      domain_url,
      admin_name,
      admin_email,
      browser_title,
      google_verfct,
      meta_tag,
      meta_keyword,
      og_title,
      og_des,
      og_url,
      og_site,
      buytext,
      home_name,
      store_service01,
      addr1,
      addr2,
      comnum,
      com_owner,
      info_owner,
      custom_phone,
    } = fields;

    let og_img_url = "";
    let favico_img_url = "";
    let logos_url = "";
    let logo_footer_url = "";
    let logo_adm_url = "";

    if (og_img) {
      og_img_url = (await saveFile(og_img, "/homeset")).ufile;
    }
    if (favico_img) {
      favico_img_url = (await saveFile(favico_img, "/homeset")).ufile;
    }
    if (logos) {
      logos_url = (await saveFile(logos, "/homeset")).ufile;
    }
    if (logo_footer) {
      logo_footer_url = (await saveFile(logo_footer, "/homeset")).ufile;
    }
    if (logo_adm) {
      logo_adm_url = (await saveFile(logo_adm, "/homeset")).ufile;
    }
    const connect = await connectDB();
    const query = `UPDATE homeset SET 
        site_name='${site_name}',
        domain_url='${domain_url}',
        admin_name='${admin_name}',
        admin_email='${admin_email}',
        browser_title='${browser_title}',
        google_verfct='${google_verfct}',
        meta_tag='${meta_tag}',
        meta_keyword='${meta_keyword}',
        og_title='${og_title}',
        og_des='${og_des}',
        og_url='${og_url}',
        og_site='${og_site}',
        buytext='${buytext}',
        home_name='${home_name}',
        store_service01='${store_service01}',
        addr1='${addr1}',
        addr2='${addr2}',
        comnum='${comnum}',
        com_owner='${com_owner}',
        info_owner='${info_owner}',
        custom_phone='${custom_phone}',
        og_img = ${og_img_url ? `'${og_img_url}'` : "og_img"},
        favico_img = ${favico_img_url ? `'${favico_img_url}'` : "favico_img"},
        logos = ${logos_url ? `'${logos_url}'` : "logos"},
        logo_footer = ${logo_footer_url ? `'${logo_footer_url}'` : "logo_footer"},
        logo_adm = ${logo_adm_url ? `'${logo_adm_url}'` : "logo_adm"},
        m_date = now()
        WHERE idx = 1;`;

    await connect.execute(query);
    return res.status(201).json({ result: "OK" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
