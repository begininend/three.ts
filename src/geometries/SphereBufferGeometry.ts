import { BufferGeometry } from "../core/BufferGeometry";
import { Vector3 } from "../math/Vector3";
import { Sphere } from "../math/Sphere";
import { Uint16Attribute, Uint32Attribute, BufferAttribute } from "../core/BufferAttribute";
/**
 * @author benaadams / https://twitter.com/ben_a_adams
 * based on THREE.SphereGeometry
 */
export class SphereBufferGeometry extends BufferGeometry {
  constructor(radius: number, widthSegments: number, heightSegments: number, phiStart?: number, phiLength?: number, thetaStart?: number, thetaLength?: number) {
    super();
    this.type = 'SphereBufferGeometry';
    this.parameters = {
      radius: radius,
      widthSegments: widthSegments,
      heightSegments: heightSegments,
      phiStart: phiStart,
      phiLength: phiLength,
      thetaStart: thetaStart,
      thetaLength: thetaLength
    };
    radius = radius || 50;
    widthSegments = Math.max(3, Math.floor(widthSegments) || 8);
    heightSegments = Math.max(2, Math.floor(heightSegments) || 6);
    phiStart = phiStart !== undefined ? phiStart : 0;
    phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;
    thetaStart = thetaStart !== undefined ? thetaStart : 0;
    thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;
    const thetaEnd = thetaStart + thetaLength;
    const vertexCount = ((widthSegments + 1) * (heightSegments + 1));
    const positions = new BufferAttribute(new Float32Array(vertexCount * 3), 3);
    const normals = new BufferAttribute(new Float32Array(vertexCount * 3), 3);
    const uvs = new BufferAttribute(new Float32Array(vertexCount * 2), 2);
    let index = 0;
    const vertices = [], normal = new Vector3();
    for (let y = 0; y <= heightSegments; y ++) {
      const verticesRow = [];
      const v = y / heightSegments;
      for (let x = 0; x <= widthSegments; x ++) {
        const u = x / widthSegments;
        const px = - radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
        const py = radius * Math.cos(thetaStart + v * thetaLength);
        const pz = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
        normal.set(px, py, pz).normalize();
        positions.setXYZ(index, px, py, pz);
        normals.setXYZ(index, normal.x, normal.y, normal.z);
        uvs.setXY(index, u, 1 - v);
        verticesRow.push(index);
        index ++;
      }
      vertices.push(verticesRow);
    }
    const indices = [];
    for (let y = 0; y < heightSegments; y ++) {
      for (let x = 0; x < widthSegments; x ++) {
        const v1 = vertices[y][x + 1];
        const v2 = vertices[y][x];
        const v3 = vertices[y + 1][x];
        const v4 = vertices[y + 1][x + 1];
        if (y !== 0 || thetaStart > 0) indices.push(v1, v2, v4);
        if (y !== heightSegments - 1 || thetaEnd < Math.PI) indices.push(v2, v3, v4);
      }
    }
    this.setIndex((positions.count > 65535 ? Uint32Attribute : Uint16Attribute)(indices, 1));
    this.addAttribute('position', positions);
    this.addAttribute('normal', normals);
    this.addAttribute('uv', uvs);
    this.boundingSphere = new Sphere(new Vector3(), radius);
  }
}
